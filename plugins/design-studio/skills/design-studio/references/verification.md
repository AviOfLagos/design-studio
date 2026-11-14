# Verification

The step that catches what re-reading your own code cannot. You wrote it, so you already believe it
works.

## Before the first screenshot

**Make sure you are looking at the current build.** A preview showing yesterday's stylesheet wastes a
whole review round and makes you "fix" things that are already fixed. Assets must have
content-hashed URLs (`styles.3f9a1c.css`, or `styles.css?v=<hash>` on a static site; see
`quality-gates.md` → *Build hygiene*). If you can't hash yet, hard-reload and confirm the response
isn't from cache before trusting a screenshot.

## Run it

```bash
node scripts/verify.mjs http://localhost:3000 / /work /about /contact
```

For each route, at **375×812 mobile and 1440×900 desktop**, in every theme, it screenshots, reports
horizontal overflow (with the widest offending elements), console and page errors, HTTP errors, and
same-origin CSS/JS served without a content hash; on desktop it scrolls with real wheel events and
hovers the first interactive element; then it checks reduced motion. Include old URLs in the route
list after a restructure: they must redirect, not 404.

Then **read the images**. No script can see a layout.

If you have a browser tool instead of Node, do the same by hand: resize to 375 and 1440, screenshot,
and evaluate `document.documentElement.scrollWidth - innerWidth` and the console on each route.

## Inspect rather than guess

When something looks wrong, ask the page:

```js
await page.evaluate(() => {
  const el = document.querySelector('.thing')
  if (!el) return 'not in DOM'
  const cs = getComputedStyle(el), r = el.getBoundingClientRect()
  return { position: cs.position, transform: cs.transform, opacity: cs.opacity,
           x: r.x, y: r.y, scrollY: window.scrollY }
})
```

A rect at `y: 2275` when the viewport is 900 tall tells you instantly that a fixed element is
anchored wrong. To find what causes horizontal overflow:

```js
[...document.querySelectorAll('body *')]
  .filter(e => e.getBoundingClientRect().right > innerWidth + 1)
  .map(e => e.tagName + '.' + e.className).slice(0, 10)
```

## Defects in frequency order

1. **Stale assets** — the preview isn't showing what you built.
2. **Content stuck off-screen** — a reveal that never fired. Scroll down and confirm.
3. **Horizontal scroll on mobile** — a fixed-width child, long unbroken strings (URLs, hashes,
   commands), or wide display type at 375px.
4. **Text overflow or clipping** at some breakpoint, usually display type.
5. **Hover states not responding** — move the mouse in steps, not a single jump.
6. **Contrast failures**, especially the accent on the light theme.
7. **Console errors.**
8. **Routes that 404**, links to routes that don't exist, old URLs not redirecting.
9. **Motion ignoring `prefers-reduced-motion`.**

## The visual critique

This is the second critique (the first is the plan critique in `direction.md`). With the screenshots
open, check:

- Does it match the mood board summary and the personality? Put a board image beside it.
- Is boldness spent in one place, or has decoration crept into every section?
- Any item from the defaults list that wasn't chosen on purpose?
- Is every page within its word budget? Read it as a scanner: can you find the action in 5 seconds?
- Remove one accessory.

## Pre-ship

- [ ] Preview confirmed current (hashed assets or verified non-cached response)
- [ ] Every route renders; hero visible; no blank first screen
- [ ] Old URLs redirect to their new homes
- [ ] Reveals fire; nothing stuck translated out of frame
- [ ] Hover and focus states respond
- [ ] Mobile 375×812: nav collapses, type fits, zero horizontal overflow
- [ ] Desktop 1440×900 checked
- [ ] Every theme checked, not just the default
- [ ] Zero console errors
- [ ] Keyboard: tab reaches everything, focus ring visible, no traps
- [ ] `prefers-reduced-motion` honoured
- [ ] Contrast ≥ 4.5:1 body, ≥ 3:1 large and UI, in every theme
- [ ] Fonts self-hosted; no layout shift on load
- [ ] Word budgets met
- [ ] Metadata, OG image and canonical per route; share into Slack to confirm
- [ ] Production build succeeds

## Two things about this loop

**You are the worst reviewer of your own output.** After staring at the generating code you see what
you intended rather than what rendered. Look at the images cold, or hand them to a subagent with the
checklist, the mood board summary and no other context.

**It terminates.** The first render usually has a few real defects. Fix those, re-check what you
changed, and stop. Perpetual polishing is not verification.

## Sandbox note

If Playwright's browser download is unavailable, point at a preinstalled Chromium:
`CHROME_PATH=/path/to/chrome node scripts/verify.mjs ...`
