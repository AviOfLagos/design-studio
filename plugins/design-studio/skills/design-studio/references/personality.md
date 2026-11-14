# Product personality

Contents: [Deriving it](#deriving-it) · [What it drives](#what-it-drives) · [Examples](#examples) · [Limits](#limits)

Colour is the shallowest place a product can express what it is. The products people remember
behave like their subject: you move through them the way you would move through the thing itself.

## Deriving it

Start from the core of the product, not its marketing adjectives. Answer three questions:

1. **What is the product's native object?** A map, a ledger, a toolkit, a toy box, a lab notebook,
   a stage. Name a physical thing.
2. **How does someone move through that object in the real world?** Pan and zoom; flip pages; open
   drawers; follow a procedure; play.
3. **Who is holding it and in what state?** A child, an engineer mid-incident, a buyer comparing
   options, a reader with time.

Write the personality as one sentence plus three to five interaction rules:

```
Personality: a field manual for people defending systems — terse, procedural, exact.
Rules: crosshair-free standard cursor; numbered procedures only where steps are real; hover reveals
spec detail rather than animating; no scroll effects; page model = sections like manual chapters.
```

Check it against the mood board: the board decides how it looks, the personality decides how it
behaves. When they agree, the site feels inevitable.

## What it drives

| Dimension | Options | Choose by |
|---|---|---|
| **Page model** | Scroll page · separate pages · pannable/zoomable canvas · stepped flow · app shell | How the native object is traversed. Default to scroll pages; reach for canvas only when space *is* the content |
| **Cursor** | System default · crosshair · custom shape · contextual (grab on pannable areas, zoom-in on images) | Custom cursors only when the object implies a tool. Never hide the system cursor on text or forms |
| **Hover** | Reveal detail · lift · underline · magnetic · preview · none | What hovering means in the object: inspecting, picking up, pointing |
| **Scroll** | Native · snap sections · horizontal for sequences · scroll-linked progress · none of it | Native unless the object is a sequence. Scroll-jacking needs a very strong reason |
| **Micro-interactions** | Confirmations, toggles, copy-to-clipboard, empty states | Make them sound like the object: a manual "logs" an action, a toy "pops" |
| **Text density** | Very low (kids, consumer, portfolio) to high (docs, specs) | Who is reading and in what state. See `content.md` |
| **Targets** | 24px WCAG minimum · 44px touch comfortable · 64px+ for kids or gloves | Who is holding the device |
| **Sound / haptics** | Rare on web; only if the object is inherently audible and it's opt-in | — |

## Examples

**A maps or location product.** The native object is a map, so the home is a pannable, zoomable
canvas rather than a scroll page. Crosshair cursor over the canvas, grab while dragging. Coordinates
in a corner update as you move. Content sits on layers you toggle like map layers; sections are
places you fly to, with a minimap or scale bar as navigation. Zoom with wheel or pinch, inertia on
pan, a "recentre" control always visible. Must still offer a plain list view and keyboard panning
(arrow keys, +/−), because a canvas is hostile to screen readers by default.

**A kids product.** Far less text: one short line per screen, icons and pictures carry meaning,
labels read aloud where possible. Targets 64px or larger with generous spacing; nothing precise to
hit. Playful, bouncy motion on response (springs with visible overshoot), never on reading. Bright,
saturated palette with high contrast. Flat structure: few levels, big home button, no hover-only
affordances because touch has no hover. A separate, calm, text-normal area for parents.

**A security tool.** A field manual or spec sheet: numbered procedures where steps are real, dense
labelled fields, revision numbers and serials as content. Monospace for anything copyable (commands,
hashes). Hover reveals detail; nothing bounces. Copy-to-clipboard with a terse "Copied" log line.
Sections read like chapters with a contents rail.

**A finance or health product.** A ledger or a chart: calm, exact, tabular numerals, motion only to
show a value changed. Precision is the personality.

**A creative tool or portfolio.** A stage or a studio wall: the work is the interface, large media,
cursor-following previews, one experimental navigation idea at most.

**A developer tool or CLI.** A terminal or a well-organised README: copyable commands up front, the
install path in the first screen, keyboard shortcuts as first-class UI.

## Limits

Personality changes behaviour; it never removes access. Every custom page model keeps a keyboard
path, a reduced-motion path, a no-JS-readable version of public content, and the conventions the
category depends on (see the competitor constraints in `discovery.md`). If a personality rule fights
the primary task, the task wins.
