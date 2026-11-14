#!/usr/bin/env node
/**
 * Screenshot and stop-ship sweep for a running dev/preview server.
 *
 *   node verify.mjs http://localhost:3000 / /work /about
 *   node verify.mjs http://localhost:3000 / /old-page        # include old URLs: they must not 404
 *   CHROME_PATH=/path/to/chrome node verify.mjs http://localhost:3000 /
 *   THEMES=light,dark THEME_KEY=theme node verify.mjs http://localhost:3000 /
 *
 * Writes PNGs to ./.verify/ at 375x812 and 1440x900 in each theme, and checks the automatable
 * stop-ship conditions: console and page errors, HTTP status, horizontal overflow (with the
 * offending elements), unhashed same-origin CSS/JS (stale-preview risk), and reduced motion.
 * Everything else needs your eyes; that is what the screenshots are for.
 *
 * Themes are applied three ways at once, because sites switch theme differently:
 * prefers-color-scheme, localStorage[THEME_KEY], and <html data-theme>. Set THEME_KEY to match
 * the site's storage key (default "theme").
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

// Settle windows, not magic: SETTLE_MS must outlast a typical intro sequence
// (preloader ~1.1s + staggered hero reveal ~1.2s) so the frame is representative.
const SETTLE_MS = Number(process.env.SETTLE_MS ?? 2800)
const HOVER_SETTLE_MS = 700
const WHEEL_STEPS = 18          // ~5700px, enough to pass the first two or three sections
const WHEEL_DELTA = 320
const WHEEL_PAUSE_MS = 70       // real wheel cadence, so smooth-scroll libraries behave
const MOUSE_STEPS = 14          // a single jump often fires no mousemove handler at all
const THEME_KEY = process.env.THEME_KEY ?? 'theme'

const [, , base = 'http://localhost:3000', ...routes] = process.argv
const paths = routes.length ? routes : ['/']
const themes = (process.env.THEMES ?? 'dark,light').split(',').map((t) => t.trim()).filter(Boolean)
const OUT = '.verify'

const slug = (p) => (p === '/' ? 'home' : p.replace(/^\//, '').replace(/[/?#=&]/g, '-'))

const launchOpts = process.env.CHROME_PATH
  ? { executablePath: process.env.CHROME_PATH, args: ['--no-sandbox'] }
  : {}

let browser
try {
  browser = await chromium.launch(launchOpts)
} catch (err) {
  console.error('Could not launch a browser.')
  console.error(err.message.split('\n')[0])
  console.error('\nFix one of these:')
  console.error('  npx playwright install chromium     (download the bundled browser)')
  console.error('  CHROME_PATH=/path/to/chrome ...     (use one already installed)')
  process.exit(2)
}

await mkdir(OUT, { recursive: true })
const findings = []
const warnings = []
const note = (route, ctx, msg) => findings.push({ route, ctx, msg })
const warn = (route, ctx, msg) => warnings.push({ route, ctx, msg })

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 375, height: 812 },
]

// A URL counts as hashed if its filename or query carries 6+ hex/base36 chars that look like a
// build hash: app.3f9a1c.css, chunk-AB12CD34.js, styles.css?v=3f9a1c.
// Dev servers serve unhashed modules by design, so this warns rather than fails; judge it against
// a production preview. SKIP_HASH_CHECK=1 turns it off.
const HASHED = /([.\-_](?=[\w-]*\d)[\w-]{6,}\.(css|js|mjs)$)|([?&](v|h|hash|ver)=[\w.-]{4,})/i
const SKIP_HASH = process.env.SKIP_HASH_CHECK === '1'

for (const vp of VIEWPORTS) {
  for (const theme of themes) {
    const ctxName = `${vp.name}-${theme}`
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: theme === 'light' ? 'light' : 'dark',
      isMobile: vp.name === 'mobile',
      hasTouch: vp.name === 'mobile',
    })
    await context.addInitScript(([key, t]) => {
      try { localStorage.setItem(key, t) } catch {}
      // Init scripts run before <html> exists; apply now if possible and again once parsed.
      const apply = () => { if (document.documentElement) document.documentElement.dataset.theme = t }
      apply()
      document.addEventListener('DOMContentLoaded', apply, { once: true })
    }, [THEME_KEY, theme])

    const page = await context.newPage()
    let current = '(page)'
    page.on('pageerror', (e) => note(current, ctxName, 'pageerror: ' + String(e).split('\n')[0]))
    page.on('console', (m) => m.type() === 'error' && note(current, ctxName, 'console: ' + m.text()))

    const origin = new URL(base).origin
    const unhashed = new Set()
    page.on('response', (r) => {
      const u = new URL(r.url())
      const type = r.request().resourceType()
      if (SKIP_HASH || u.origin !== origin || !['stylesheet', 'script'].includes(type)) return
      if (/^\/(@vite|@react-refresh|@fs|src|node_modules|_next\/static)\b/.test(u.pathname)) return
      if (!HASHED.test(u.pathname + u.search)) unhashed.add(u.pathname)
    })

    for (const p of paths) {
      current = p
      try {
        // 'load' rather than 'networkidle': a dev server holds an open HMR socket, so
        // networkidle can never settle and every route would time out.
        const res = await page.goto(base + p, { waitUntil: 'load', timeout: 30000 })
        if (res && res.status() >= 400) note(p, ctxName, `HTTP ${res.status()}`)
        const landed = new URL(page.url()).pathname
        if (landed !== new URL(base + p).pathname) warn(p, ctxName, `redirected to ${landed}`)
      } catch (e) {
        note(p, ctxName, 'navigation failed: ' + e.message.split('\n')[0])
        continue
      }
      await page.waitForTimeout(SETTLE_MS)
      await page.screenshot({ path: `${OUT}/${ctxName}-${slug(p)}.png` })

      if (vp.name === 'mobile') {
        // Without it, phones lay the page out at ~980px and shrink it: overflow hides, text is tiny.
        const hasViewport = await page.evaluate(() => !!document.querySelector('meta[name="viewport"]'))
        if (!hasViewport) note(p, ctxName, 'no <meta name="viewport">: mobile renders a shrunken desktop layout')
      }

      const overflow = await page.evaluate(() => {
        // clientWidth, not innerWidth: mobile emulation zooms out to fit wide content, which
        // grows innerWidth and hides exactly the overflow we're looking for.
        const w = document.documentElement.clientWidth
        const over = document.documentElement.scrollWidth - w
        if (over <= 1) return null
        const culprits = [...document.querySelectorAll('body *')]
          .map((e) => ({ e, r: e.getBoundingClientRect() }))
          .filter(({ e, r }) => r.right > w + 1 && getComputedStyle(e).position !== 'fixed')
          .sort((a, b) => b.r.right - a.r.right)
          .slice(0, 3)
          .map(({ e, r }) => `${e.tagName.toLowerCase()}${e.id ? '#' + e.id : ''}${
            typeof e.className === 'string' && e.className ? '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.') : ''
          } (right ${Math.round(r.right)})`)
        return { over, culprits }
      })
      if (overflow) note(p, ctxName, `horizontal overflow ${overflow.over}px: ${overflow.culprits.join(', ')}`)

      if (vp.name === 'desktop' && theme === themes[0]) {
        for (let i = 0; i < WHEEL_STEPS; i++) {
          await page.mouse.wheel(0, WHEEL_DELTA)
          await page.waitForTimeout(WHEEL_PAUSE_MS)
        }
        await page.waitForTimeout(HOVER_SETTLE_MS)
        await page.screenshot({ path: `${OUT}/${ctxName}-${slug(p)}-scrolled.png` })
        await page.evaluate(() => window.scrollTo(0, 0))

        const row = page.locator('main a, main button, a, button').first()
        try {
          const box = await row.boundingBox({ timeout: 2000 })
          if (box) {
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: MOUSE_STEPS })
            await page.waitForTimeout(HOVER_SETTLE_MS)
            await page.screenshot({ path: `${OUT}/${ctxName}-${slug(p)}-hover.png` })
          }
        } catch { /* nothing hoverable on this route; not a failure */ }
      }
    }
    for (const u of unhashed) warn(u, ctxName, 'asset URL has no content hash: previews may serve a stale copy')
    await context.close()
  }
}

// Reduced motion: if a page still animates with the preference set, it is being ignored.
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  for (const p of paths) {
    try {
      await page.goto(base + p, { waitUntil: 'load', timeout: 30000 })
    } catch { continue }
    await page.waitForTimeout(600)
    // Catches CSS and Web Animations API animations. JS-driven loops (requestAnimationFrame,
    // smooth-scroll libraries) are invisible here: compare the reduced-motion screenshots by eye.
    const running = await page.evaluate(
      () => document.getAnimations().filter((a) => a.playState === 'running').length,
    )
    if (running > 0) note(p, 'reduced-motion', `${running} animation(s) still running`)
    await page.screenshot({ path: `${OUT}/reduced-motion-${slug(p)}.png` })
  }
  await context.close()
}

await browser.close()

const dedupe = (list) => [...new Map(list.map((f) => [`${f.ctx}|${f.route}|${f.msg}`, f])).values()]
const print = (title, list) => {
  if (!list.length) return
  console.log(`${title}:\n`)
  for (const f of dedupe(list)) console.log(`  ${f.ctx.padEnd(18)} ${f.route.padEnd(24)} ${f.msg}`)
  console.log()
}

if (findings.length === 0) console.log('No automated stop-ship conditions triggered.\n')
print('Stop-ship findings', findings)
print('Warnings', warnings)

console.log(`Screenshots in ${OUT}/ — now read them. No script can see a layout.`)
console.log('Look for: content stuck off-screen from a reveal that never fired, text clipping,')
console.log('contrast failures in each theme, hover states that did not respond, and whether it')
console.log('still looks like the mood board.')
process.exit(findings.length ? 1 : 0)
