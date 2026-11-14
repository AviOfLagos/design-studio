# Design system

Contents: [Three layers](#three-layers) · [Colour](#colour) · [Theming](#theming) · [Type](#type) · [Layout and depth](#layout-and-depth) · [The reskin test](#the-reskin-test)

## Three layers

Tokens go primitive → semantic → component. Components reference **semantic** tokens only, never a
raw value and never a primitive.

Values below come from the mood-board worked example (graphite + signal orange). They illustrate the
mechanism; never carry them into another project as defaults.

```css
:root {
  /* 1. primitive — raw values, named by what they are */
  --orange-500: oklch(0.68 0.21 38);
  --graphite-900: oklch(0.25 0.008 260);
  --graphite-850: oklch(0.29 0.008 260);
  --paper-50: oklch(0.96 0.006 85);

  /* 2. semantic — named by role. this is the only layer components touch */
  --bg: var(--graphite-900);
  --bg-soft: var(--graphite-850);
  --ink: var(--paper-50);
  --muted: oklch(0.72 0.01 260);
  --accent: var(--orange-500);
  --line: oklch(from var(--ink) l c h / 0.12);
}
```

If adding a theme requires editing components, the token layer is wrong. That is the whole test.

**OKLCH is worth using** where support allows. It is perceptually uniform, so a lightness change
looks like the same amount of change across hues — which HSL does not give you, and which is exactly
what you need when deriving hover and muted variants.

The trap is gamut. Maximum sRGB chroma varies sharply by hue and lightness: around 0.11–0.14 for
blues, higher for yellows and greens, and lower at both very dark and very light values. There is no
single safe chroma number. A value outside gamut is silently clamped by the browser, so the colour
you specified is not the colour that renders — and any contrast check you ran against the nominal
value is unreliable. Verify each token in a gamut-aware picker, or wrap wide-gamut values in
`@supports (color: color(display-p3 1 1 1))` with an sRGB fallback. Derive hover and muted states
with relative colour syntax rather than hand-picking new values.

## Colour

**One accent, and mean it.** A single accent used consistently — links, primary CTA, active nav,
the number that matters — reads as a deliberate system. Two accents read as a template with a theme
picker. Per-item colour is different and fine: giving each project card its own hue is *data*,
expressed through a local variable, not a second system colour.

**Never pure black or pure white for large grounds.** `#000` has no headroom beneath it, so nothing
recedes and shadows have nowhere to go. Large areas of `#fff` cause glare. But the reflexive fix,
neutral near-black `#0B0B0B` or `#111`, is itself on the defaults list in `direction.md`. Give the
ground a hue and a lightness that come from the mood board or the subject: graphite, ink-blue,
oxblood, newsprint, bone.

**Derive hairlines from the ink colour at low alpha** rather than picking a grey. A derived line
sits correctly on any ground you later swap in; a fixed `#222` does not.

## Theming

Light, dark and system is a baseline expectation, and retrofitting it means touching every
component — so build it in Phase 5, not later.

A theme is one block of semantic overrides:

```css
[data-theme='light'] {
  --bg: var(--neutral-50);
  --ink: var(--neutral-950);
  --muted: oklch(0.50 0.01 280);
  --accent: oklch(0.58 0.19 38);   /* re-tuned per theme: darker on light grounds, gamut-checked */
  color-scheme: light;
}
```

Two things people get wrong:

**Accents need re-tuning per theme.** An accent that sings on near-black usually fails contrast on
near-white. Check every semantic pair in every theme — perceptual lightness is not a contrast
guarantee.

**The flash of wrong theme.** A `useEffect` runs after paint, so the user sees the wrong theme first.
Prevent it with a synchronous inline script in `<head>` plus `suppressHydrationWarning` on `<html>`:

```tsx
<script dangerouslySetInnerHTML={{ __html: `
  try {
    var t = localStorage.getItem('theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = t;
  } catch (e) {}
` }} />
```

**Other modes matter too.** Windows High Contrast and similar force their own palette via
`forced-colors: active` — your custom properties are overridden, so anything conveying meaning
purely through background colour disappears. Test it, use `system-color` keywords where you must
intervene, and never remove borders that are carrying meaning. Respect `prefers-contrast: more` by
raising border and text contrast rather than ignoring it. For multi-brand theming, add brand as a
second data attribute on the same semantic layer rather than a parallel token set.

Provide a `@media (prefers-color-scheme: dark)` fallback in CSS as well as the JS toggle, so the
site is still correct before hydration and with JavaScript disabled.

Set `color-scheme` per theme so form controls and scrollbars follow. Store in `localStorage` by
default, which preserves static prerendering; use a cookie only when the server must render the
theme class. And never branch rendered markup on the theme during first render — render both states
and switch with CSS, or you get hydration mismatches.

## Type

Faces and roles are chosen in Phase 3 (`direction.md` → *Typography*): one family or two, a mono
only when there is real code, specs or data or the board calls for it. All-caps tracked labels are on
the defaults list; use them only when chosen. This section is execution.

```css
.hero        { font-size: clamp(2.7rem, 11vw, 10rem);  letter-spacing: -0.045em; line-height: 0.88; }
.page-title  { font-size: clamp(2.6rem, 8vw, 6.5rem);  letter-spacing: -0.04em;  line-height: 0.94; }
.section     { font-size: clamp(2rem, 5vw, 3.6rem);    letter-spacing: -0.03em;  line-height: 1; }
.lede        { font-size: clamp(1.05rem, 1.7vw, 1.3rem); line-height: 1.6; }
.meta        { font-size: 0.8rem; color: var(--muted); }   /* case and face come from the direction */
```

The `clamp()` values are a starting shape, not a scale. Derive actual sizes from a modular ratio
chosen for the brief, and check the hero at 320px: an `11vw` minimum on a long word can still
overflow.

**Tighten tracking on display sizes.** Most text faces have sidebearings tuned for body copy; at
160px those gaps become chasms. Display cuts and some wide grotesks are already tight, so judge by
eye per face rather than applying one value. Small all-caps or small text, conversely, wants
positive tracking.

Self-host with a font package or local files rather than a CSS `@import` of a web font: an imported
font blocks render and then reflows the page when it lands. Preload the primary face,
`font-display: swap`, subset, and keep weights to what the scale actually uses (usually two per
family). Use `size-adjust` / `ascent-override` on the fallback, or the framework's font module, to
keep the swap from shifting layout. Check licences: a face from the mood board may not be free to
self-host.

## Layout and depth

Two widths cover almost everything: a wide container for layout, a narrow one for prose. Body
measure 60–75 characters, never past 80; past that the reader loses the return sweep. Size the
narrow container in `ch` so it tracks the font rather than a pixel guess.

```css
.container { width: min(1240px, calc(100% - 3rem)); margin-inline: auto; }
.narrow    { width: min(68ch, calc(100% - 3rem)); margin-inline: auto; }
.section   { padding-block: clamp(5rem, 12vh, 9rem); }
```

On dark grounds, layered shadows turn to mud. Get depth from a surface shift (`--bg` → `--bg-soft`
on raised or hovered elements), hairlines at low alpha, and exactly one long shadow reserved for
genuinely floating elements.

## The reskin test

When the tokens are right, changing the accent and the two ground colours reskins the entire site
with no other edit, and adding a theme is one block of overrides. If you find yourself hunting hex
values inside components, the token layer was incomplete — fix it then, not later.
