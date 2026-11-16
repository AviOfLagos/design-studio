# Build kickoff

> Fill the blanks and paste this into the building session. It carries every decision forward so the
> builder never has to re-derive or guess them. It must stand alone: the builder may not have this
> skill.

---

Build `<project>` from the decisions below. They are settled; do not re-litigate them. If something
is genuinely unworkable, say so and stop rather than silently substituting.

**Brief.** `<product, audience, primary task, trust posture — four sentences>`

**Mood board.** `<the one-line read and the findings → decisions table from docs/MOODBOARD.md>`.
The board is the user's explicit instruction; it outranks your taste.

**Personality.** `<sentence>`. Interaction rules: `<page model, cursor, hover, scroll,
micro-interactions, target size>`.

**Direction.** Signature move: `<the one place boldness is spent>`. Everything else stays quiet.
Supporting system: `<light, layers, grain, gradient role, image rule, accent rule, radius/stroke/shadow>`.
Typography: `<faces and roles>`.

**Do not drift into these defaults** unless listed above as chosen: cream + serif + terracotta;
near-black + single acid accent; broadsheet hairlines; the SaaS card kit (identical rounded cards,
one radius, same grey shadow); all-caps eyebrow labels; `A · B · C` meta strings; `WORD — fragment`
labels; reflexive `#0B0B0B`/`#111`; mono for small data labels; `→` on links and buttons; one accented
word in a headline; `01/02/03` on non-sequences; fade-up on every section.

**Tokens.** Implement exactly these as CSS custom properties in three layers — primitive, semantic,
component. Components reference semantic tokens only.

```
<paste the token table>
```

Themes: `<light / dark / system / …>`. Prevent flash-of-wrong-theme with a synchronous inline script
in `<head>`; a `useEffect` runs too late.

**Known problems.** These are the failures most products in this category share. Each has a fix;
build the fix, don't rediscover the problem.

```
<paste the known-problems tables from docs/DIRECTION.md and docs/ARCHITECTURE.md>
```

**Stack.** `<framework>`, chosen because `<signals>`. Do not substitute. All indexable content
renders server-side; client-only data fetching only inside authenticated routes.

**Content.** Every string lives in `<lib/content.ts>`; no hardcoded copy in components. Word budget
per route is in the table below; stay inside it. Show rather than tell. Buttons say what happens
("Save changes", not "Submit"), an action keeps its name through the flow, errors say what went wrong
and how to fix it, empty states carry the action. Sentence case.

**Pages.** Build these routes, in this order:

```
<paste the page inventory with page model and word budget>
```

**Redirects.** Every old URL keeps working:

```
<paste the redirect map>
```

**Motion.** Budget tier: `<tier>`. Motion that answers the user's action is welcome when it shows
what changed. Motion nobody asked for gets **one orchestrated moment**: `<which>`. Primitives allowed:
`<pick 2–3>`. Response motion ≤ 500ms; entrances 600–850ms, ease `[0.22, 1, 0.36, 1]`; springs for
pointer response. Animate only `transform` and `opacity`. Reveals fire once and never touch headline
copy. Under `prefers-reduced-motion`, reduce to opacity or nothing and set
`animation-iteration-count: 1`.

**Build order.** Tokens → layout shell → content model → routes → components → motion → metadata.
Finish one route completely before starting the next.

**Non-negotiable while building.**

- Content-hashed CSS/JS URLs from the first commit, so previews never show a stale stylesheet.
- Spacing owned in one layer; no element selector and component class both setting section padding.
- Every data surface renders four states: loading, empty, error, populated.
- Error boundaries and a designed 404 before launch.
- Metadata, canonical and OG image per route; sitemap and robots on day one.
- WCAG 2.2 AA: visible focus, ≥ 24px targets (`<44px / 64px>` for this audience), one `<h1>` and
  ordered headings, `lang` set, labelled inputs, intentional alt text, reduced motion honoured.
- Focus moves to the new page on client-side navigation; modals trap focus and restore it.
- Loading, empty and error regions are `aria-live="polite"`.
- `strict` TypeScript; schema validation at every trust boundary.

**After every milestone**, screenshot every route at **375×812 and 1440×900** in every theme and read
the images. Check horizontal overflow (`document.documentElement.scrollWidth > innerWidth`) and the
console on each. Compare against the mood board. Remove one accessory. Do not ship while there is a
console error, horizontal overflow, unreadable text at any breakpoint, a 404 (including old URLs),
invisible keyboard focus, contrast failure in any theme, motion that ignores reduced motion, or a
stale stylesheet in the preview.

**Everything not scoped for v1** — the deferred items in `docs/ARCHITECTURE.md` — goes into the
issue tracker rather than being silently dropped.
