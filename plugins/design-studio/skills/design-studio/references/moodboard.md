# Mood board

Contents: [Why it is a gate](#why-it-is-a-gate) · [Asking](#asking) · [Reading a board](#reading-a-board) · [Translating to tokens](#translating-to-tokens) · [No board](#no-board) · [Worked example](#worked-example)

## Why it is a gate

Everything else in this skill reduces the odds of a generic result. The mood board is the only input
that makes the result *theirs*. Research tells you what the category does; the board tells you what
this person finds beautiful, and that is the axis you cannot derive. A board is explicit instruction
under the precedence rule, so it outranks your defaults and your references.

## Asking

Ask once, before any design decision, in one short message:

> Before I make any design calls: do you have a mood board? A Pinterest board, Are.na channel, Figma
> page or a folder of screenshots all work. It's the biggest single lever on whether this looks like
> yours or like everyone else's.

If the user already supplied one in the brief, don't ask; read it.

## Reading a board

**Open it and scroll the whole thing.** The first screen of a board is what the platform ranked, not
what the user collected most of.

- **Pinterest:** use the browser tool. Private boards load when the user is signed in to Pinterest in
  that browser; if you hit a sign-in wall, ask them to sign in there, then continue. Scroll until no
  new pins load (boards lazy-load in batches). Open 5–10 pins full-size; thumbnails hide grain, type
  and detail. Prefer the text a11y tree or page text for pin titles and source domains, and
  screenshots only for the visual read.
- **Are.na:** channels are public by default and readable as a grid; note the source links, they
  often lead to the actual sites.
- **Figma:** read frames with the Figma tools if connected; otherwise ask for an export.
- **Screenshots folder:** read every image.

Note the source domains of pins: a board full of links to one studio or type foundry is a signal.

**Extract**, in this order, and write each as a concrete, buildable statement:

| Axis | What to write down | Bad | Good |
|---|---|---|---|
| Palette | 4–6 named colours with approximate values, and their proportions | "dark and moody" | "graphite #2A2B2E as ground (~70%), signal orange #FF5A1F for single marks (~3%)" |
| Type character | width, weight, contrast, case, era; serif/sans/mono; named candidates | "bold fonts" | "wide heavy grotesk, tight; numerals in dot-matrix; mono for specs" |
| Framing devices | how content is bounded | "techy" | "bracket corner marks instead of boxes; registration crosses" |
| Density | whitespace vs packed; grid visible or not | "clean" | "dense spec-sheet columns, small type, lots of labelled fields" |
| Imagery treatment | photo/illustration/3D, grade, crop, texture | "cool images" | "monochrome, high-contrast, scanlines, amber CRT glow" |
| Recurring motifs | anything appearing 3+ times | — | "serial numbers, hazard stripes, numbered callouts" |
| Motion hints | GIFs or video pins, implied movement | — | "flicker-on, typewriter reveal" |
| What's absent | what nobody pinned | — | "no gradients, no rounded cards, no people" |

Count rather than impress: "orange appears in 31 of 48 pins" beats "lots of orange". What's absent
is as useful as what's present: it tells you what to leave out.

## Translating to tokens

Write `docs/MOODBOARD.md` from `assets/MOODBOARD.md`, then map each finding to a decision in
DIRECTION.md, citing it:

```
Board: graphite ground in 70% of pins        → --bg: graphite, not black   (MOODBOARD §palette)
Board: bracket corner frames in 22 pins      → card component uses corner marks, no border box
Board: dot-matrix numerals                   → display numerals in a dot-matrix face, stats only
```

Every board finding either becomes a token, a component rule or a motion rule, or is explicitly
declined with a reason (it fights legibility, contrast, the trust posture). Silent omission is not
allowed; the user will notice the thing they pinned is missing.

When the board conflicts with research (board says dense and dark, category is credibility-driven
health), the board still wins on taste. Spend your judgement on making it legible and trustworthy
inside that taste, and note the tension once.

## No board

Say it plainly, once:

> Without a mood board this will lean generic: I'll be choosing taste for you from category
> research, and that converges on what everyone else's looks like. Two options: share a board now
> (even 15 pins is enough), or I proceed and you redirect after the first screenshots.

If they want to build one, suggest where to collect, with concrete queries for their category. Fill
in the product and the personality words:

- **Pinterest:** `<category> website design`, `<category> ui dark`, `<personality word> poster`,
  `<material or era> typography`. For a security tool: `industrial spec sheet design`,
  `technical manual layout`, `hazard label typography`, `CRT terminal aesthetic`.
- **Awwwards** (awwwards.com/websites/, filter by category and "Sites of the Day").
- **Godly** (godly.website), **Land-book** (land-book.com), **Siteinspire** (siteinspire.com,
  filter by style and type), **Are.na** (search the personality words).
- **Outside the web:** packaging, signage, record sleeves, manuals and posters from the product's
  world. The most distinctive boards are rarely all websites.

Suggest pinning 15–40 things and adding a one-line note on any pin they love for a specific reason.

**Do not substitute your own board for theirs.** Collecting references for research (Phase 2) is
your job; deciding their taste is not. If they choose to proceed without one, write "No mood board:
user chose to proceed; direction is derived from research and personality only" in DIRECTION.md, and
make the first screenshot review an explicit taste checkpoint.

## Worked example

Avi's "Hack-vibe" board, for a security tool's site. Read as a whole it said **industrial spec
sheet**:

- **Palette:** graphite, not black; signal orange as the single mark colour; amber CRT as a
  secondary glow on imagery only.
- **Type:** a wide, heavy grotesk for display; dot-matrix numerals for figures; an IBM Plex-style
  mono for specs and labels.
- **Framing:** bracket corner frames instead of bordered boxes.
- **Density:** spec-sheet dense, labelled fields, small type held on a strict grid.

Translated directly into tokens and component rules, it produced a site the user called exemplary.
Note that several of these (mono labels, a dark ground, a single bright accent) appear on the
defaults list in `direction.md`. Here they are *chosen*, cited to the board and tuned (graphite with
a hue instead of neutral near-black; orange used for marks, not everywhere), which is exactly the
difference between a default and a decision.
