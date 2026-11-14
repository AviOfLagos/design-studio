# Direction

Contents: [The defaults](#the-defaults) · [Typography](#typography) · [Spend boldness in one place](#spend-boldness-in-one-place) · [Art direction as a system](#art-direction-as-a-system) · [Technique by technique](#technique-by-technique) · [Interaction budget](#interaction-budget) · [The proposal](#the-proposal) · [Plan, then critique](#plan-then-critique)

## The defaults

Name what you are avoiding precisely; "be creative" does nothing. AI-generated interfaces currently
converge on a small set of looks. Every one is legitimate for *some* brief, and when the user's brief
or mood board asks for one, build it exactly. But they appear regardless of subject, so where an
axis is left free, don't spend that freedom on one of these.

**Whole-page looks**

1. Warm cream ground near `#F4F1EA`, high-contrast serif display, terracotta or clay accent near
   `#D97757`. That value is Anthropic's own accent; on a user's brief it reads as a tell.
2. Near-black ground with a single bright acid-green, lime or vermilion accent.
3. Broadsheet layout: hairline rules, zero radius, dense newspaper columns.
4. The SaaS card kit: content chopped into identical rounded cards, one radius on everything
   regardless of hierarchy, the same soft grey shadow (`rgba(0,0,0,.1)`) under each, gradient washes
   as decoration. Usually with three feature cards with outline icons, a centred hero, a dark band and
   a footer.
5. Framework defaults untouched: Tailwind `indigo-500` primary, default spacing and shadow ramps.
6. Saturated purple-to-blue mesh gradient blobs.
7. Corporate Memphis illustration.

**Template chrome** — small treatments that appear whatever the subject:

- A tracked-out ALL-CAPS eyebrow label above every heading; all-caps labels generally.
- Meta strings joined with middle dots: `A · B · C`.
- Labels built as `WORD — fragment` with a spaced em dash.
- Tinted near-black (`#0B0B0B`, `#111`) standing in for black by reflex.
- A monospace face for small data labels.
- `→` appended to link and button text.
- One word in a headline set in italic, bold or the accent colour.
- `01 / 02 / 03` numbered markers on content that isn't a sequence.
- The hero as big number + small label + supporting stats + gradient accent.

The test is blunt: **could this be any other product's site?** If yes, you defaulted.

The mood board can legitimately call for any of these (see the worked example in `moodboard.md`,
which chose mono labels and a dark ground). Then they are decisions: cite the board, and tune them so
they belong to this brief, not the generic version.

## Typography

Typography carries the personality of the page more than colour does.

- **Choose faces for this brief**, not the families you'd reach for on any project. Inter, Roboto,
  Open Sans, system-ui, and the one serif you always pair them with are defaults; using one is fine
  only when you can say why it beats the alternatives *for this subject*. Derive candidates from the
  mood board's type character, the subject's vernacular (signage, manuals, packaging, posters of its
  world) and the personality. Write the reason in DIRECTION.md: "Wide heavy grotesk because the board
  is spec-sheet industrial; not Inter because it has no width to carry a hero."
- **One family or two.** If two, make them clearly distinct in role and form; two similar sans faces
  read as a mistake. A mono is a third role, not a default; add it when there is real code, specs or
  data, or the board calls for it.
- **A clear scale** with intentional weights, widths and spacing, after Bringhurst's *Elements of
  Typographic Style*: a modular ratio, a limited set of sizes, every size used for a reason.
- **Type as an active element.** In headlines, use the treatment itself — scale, width, cropping,
  setting — as part of the design, not a neutral delivery vehicle.
- **Measure:** body text 60–75 characters, never past 80. Serif body can run slightly longer and wants
  slightly more line-height than sans.
- Execution detail (fluid sizes, tracking, loading): `design-system.md` → *Type*.

## Spend boldness in one place

Let one element be the memorable thing — the signature move — and keep everything around it quiet
and disciplined. Cut any decoration that doesn't serve the brief. Before calling a page done, look in
the mirror and remove one accessory.

The hero is the first thing people see. Open with the most characteristic thing in the subject's
world, in the most fitting form: a headline, an image, an animation, a live demo, an interactive
moment. Choose deliberately; the default hero treatment is on the list above.

## Art direction as a system

What separates "slapped together" from "alive" is not which effects are used; it is whether surface
treatments come from **one coherent system** or are decorations applied per section.

Slapped together: default framework spacing, untreated stock photography, one flat colour behind
every section, an accent that appears nowhere in the imagery, shadows with inconsistent light
sources.

Alive: a consistent light direction, a treatment applied to *every* image, background layers that
establish depth, the accent echoed in the imagery.

So: **one signature move** executed to a high standard (a photography grade, an illustration system,
a single 3D or generative hero, a distinctive type setting, a personality-driven page model), plus
the supporting system everything else obeys: light direction, background layer strategy, grain,
gradient role, image treatment rule. Restraint plus one exceptional move beats five trends at sixty
percent.

**Consistency is not uniformity.** Contrasting shape decisions are good — a pill CTA against
hard-cornered cards reads as deliberate — provided the system underneath holds: one stroke weight,
one shadow light source, one surface ramp, one rule for where the accent lands. Vary radius by
hierarchy rather than applying one radius to everything.

**Visual structure is information.** Outlines, borders, numbering, eyebrows, dividers and labels
should encode something about the content. If removing one loses no information, remove it.

## Technique by technique

| Treatment | Works when | Reads cheap when |
|---|---|---|
| Noise / grain | Global layer at 2–6% opacity, unifying gradients and killing banding. Strongest on dark UI | Per-section texture; heavy enough to notice; animated; over body text |
| Mesh gradients | Large, low-contrast, low-saturation ambient light behind content, paired with grain | Saturated blobs; gradient text on body copy; fighting foreground contrast |
| Neo-brutalism | Deliberate positioning against category norms — dev tools, indie products, agencies | Hard shadow + thick black border + chartreuse: now as templated as the gradient blob |
| Collage, cutouts, imperfection | Reads as visible human labour | Made from AI-generated "collage elements", which defeats the point |
| 3D / WebGL | The 3D object *is* the product, or one hero moment with a static fallback | Decorative floating shapes; anything pushing LCP past 2.5s |
| Photography | A system: consistent grade, crop logic, duotone or overlay tied to the palette | Untreated stock; smiling team in a loft; visible AI artefacts, now an active trust liability |
| Illustration | One system: defined stroke, palette subset, perspective, figure style, reused everywhere | Mixed sources; generic flat-vector corporate style |
| Generative canvas | Encodes something real — live data, user input, the product's mechanism | Random particles reacting to the cursor: high CPU, zero information |
| Neumorphism | Rarely, never on interactive controls; it fails contrast | Any button |
| Dark mode | Baseline expectation: light, dark and system | Dark only, or light tokens inverted with unadjusted shadows and imagery |

Two forces define current practice: flight from AI-default aesthetics toward evidence of human
craft, and performance discipline, because visual maximalism collides with Core Web Vitals and heavy
hero treatments are usually why a site fails them.

## Interaction budget

Set by product type, not preference. The more the user is thinking about their own problem, the less
you can spend on motion. The personality (`personality.md`) decides the *kind* of motion; the budget
decides *how much*.

| Product type | Budget | Rules |
|---|---|---|
| Portfolio / agency | Highest — motion *is* the artifact | Experimental navigation and heavy WebGL are defensible here and almost nowhere else. Still ship reduced motion |
| Marketing / brand | High | One orchestrated hero moment. Reveals on secondary graphics only, once, never on headline copy. Above the fold reads with JS disabled |
| Kids / playful consumer | High on response, low on reading | Bouncy feedback to taps; nothing moves while they read |
| E-commerce | Low-medium, asymmetric | Generous on product imagery, zoom, variants. Near zero in cart and checkout |
| Onboarding / first run | Medium, time-boxed | Teaching justifies motion here. Skippable, never repeats |
| SaaS dashboard | Very low | Seen 50× a day, so every animation is a 50× tax. Feedback and state change only |
| Docs / support | Near zero | Users arrive mid-problem. Scroll reveals break in-page search and anchor links |
| Fintech / health / gov | Lowest | Motion reads as unserious, and unserious reads as untrustworthy |

Values and primitives: `motion.md`.

## The proposal

One recommendation, not a menu:

```
Mood board          what it said, in three lines, and which findings became which decisions
Personality         the sentence and its interaction rules
Who I studied       4–6 links, one line each on the signature move
What I'm rejecting  the pole, and why it's wrong for this brief
DNA blend           ≈50% A's skeleton and motion, ≈30% B's content model, ≈20% C's polish
Typography          faces, roles, and why not the default faces
Signature move      the one place boldness is spent + the supporting system
Interaction budget  tier and what it permits
One question        whatever the mood board left genuinely open
```

If the user stated a style preference that differs from what category leaders do, honour it and add
one paragraph of evidence about the category, so they're choosing to differ rather than not knowing.

## Plan, then critique

Before any code, write a compact plan:

- **Colour:** 4–6 named values with roles.
- **Type:** faces and roles.
- **Layout:** one-sentence prose per key screen plus ASCII wireframes; alignment rule (left, centred,
  justified) stated.
- **Principles:** three to five rules that make this site specific.

Then review it against the brief and board **as if fresh**: run the brief through your head as a
similar-but-different prompt and see if you'd land in the same place. Any part that matches the
defaults list, or that you'd produce for any similar brief, gets revised. Say what you changed and
why. Only then build.

This is the one critique before build. The second critique is visual and happens in Phase 7 with
screenshots (`verification.md`). Keep a short note of what you tried; on the next pass, try something
new rather than repeating it.
