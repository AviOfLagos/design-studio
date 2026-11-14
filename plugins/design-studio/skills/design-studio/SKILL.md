---
name: design-studio
description: 'Studio-grade web design from mood board to verified build. Reads the user''s mood board (Pinterest, Are.na, Figma, screenshots) into tokens, derives a product personality that shapes interaction and page structure, then runs research, art direction, content architecture with word budgets, stack choice, design tokens and theming, accessibility, SEO, build and screenshot checks. Use it for any web UI work: building, redesigning, restyling or planning a site, landing page, portfolio, docs, dashboard, app screen or component, and whenever a PRD arrives with no design direction. Trigger on casual phrasings too: "build me a site for X", "make this look better", "this looks generic or AI-generated", "give it personality", "add animation", "pick fonts or colours", "what stack should I use", "here''s my Pinterest board", or a site named as the feel they want. Not for backend-only work, small tweaks inside a mature design system, or chart styling.'
license: MIT; portions Apache-2.0, see NOTICE.md
compatibility: Tool-agnostic; every phase can run by hand. Optional scripts need Node with Playwright (verification) and the GitHub CLI (issue creation). A browser tool makes the mood-board step far better; without one, ask for screenshots.
metadata:
  author: David Olatunji
  version: '2.0.0'
  homepage: https://avi.nexprove.com
  merged-from: award-tier-ui 1.0.0 + Anthropic frontend-design 1.1.1 (Apache-2.0)
---

# Design studio

Handed a brief, an agent starts writing markup and makes a thousand design decisions implicitly, each
at the moment of least information. The result is competent and anonymous. This skill moves those
decisions in front of the code and grounds them in two kinds of evidence: **the user's own taste**
(their mood board) and **the product's own nature** (its personality, users and market).

The blunt test at every stage: **could this be any other product's site?** If yes, you defaulted
rather than decided. `references/direction.md` names the specific defaults to check against.

## Precedence

Higher wins:

1. **The user's explicit instruction.** Their mood board counts as explicit instruction.
2. **The existing codebase's conventions.**
3. **This skill's defaults.**

If they want purple and brutalist, build purple and brutalist and spend your judgement on doing it
well. Say once what you'd have chosen and why, then commit. That includes the looks this skill
calls defaults: when the brief or board asks for one, it is a choice, not a default.

## Working style

Decide and disclose rather than asking. Gate on the user only for: **the mood board (Phase 0, always)**,
irreversible actions, facts you cannot obtain, and the single open question in Phase 3. If the user
is absent, make the call, state it in the deliverable and continue.

## Routing

| Situation | Go to |
|---|---|
| New project, PRD, "build me a site" | Phase 0, run the loop |
| Redesign or restyle | Phase 0, then Phase 4's content-architecture check **before** touching styles; treat the current site as a competitor |
| "Make this look better / less generic" | Phase 0, then `references/direction.md` → *The defaults* |
| Small component or single screen | Phase 0 (ask once), then compact path: personality → plan → critique → build → screenshot |
| "What stack should this be?" | `references/architecture.md` → *The rendering question* |
| Direction agreed, ready to build | Phase 6, then `assets/BUILD-KICKOFF.md` |
| Built, wants it checked | Phase 7 and `scripts/verify.mjs` |

---

## Phase 0 — Mood board (mandatory gate)

**Before any design decision, ask for a mood board**: a Pinterest board, an Are.na channel, a Figma
file, a folder of screenshots. One message, one ask.

- **Given:** open it, scroll the whole thing, and extract palette, type character, framing devices,
  density, imagery treatment and recurring motifs into `docs/MOODBOARD.md` (`assets/MOODBOARD.md`).
  DIRECTION.md must cite it.
- **Not given:** stop and say plainly that without one the result will lean generic. Offer two
  choices: share one now, or proceed without. You may suggest where to collect references, with
  concrete search strings for their category. **Never assemble a board yourself and treat it as
  theirs.**

Method, extraction checklist, collection sources and a worked example: `references/moodboard.md`.

**Exit:** `docs/MOODBOARD.md` written, or the user has explicitly chosen to proceed without one.

## Phase 1 — Brief and personality

Read what exists: PRD, spec, deck, current site, brand assets, connected docs. If the subject isn't
stated, propose one concrete subject, audience and job and confirm it. Fill `assets/BRIEF.md`:
product, audience, primary task, trust posture, interaction budget tier, constraints, success, out
of scope. Write it before looking at competitors; that prevents design fixation.

Then derive the **product personality** from the core of what the product *is*, and let it drive
interaction and structure, not only colour: cursor, hover, scroll behaviour, page model (scroll,
pages, canvas), micro-interactions, how much text. A maps product becomes a pannable canvas; a kids
product talks less and uses big targets; a security tool reads like a field manual.
`references/personality.md`.

**Exit:** `docs/BRIEF.md` with a personality section; you can state product, user, task, budget tier
and personality without hedging.

## Phase 2 — Research

Competitors as **constraints** (5–8, proposed back to the user), 2–3 **adjacent-niche donors** with
an explicit structural map, **craft references** that pass a 3-of-6 evidence test, and **review
mining** turned into named recommendations. Method: `references/discovery.md`.

**Exit:** validated references with signature move / worth stealing / over-engineered here; a named
pole you are rejecting; review themes converted to recommendations.

## Phase 3 — Direction

One proposal the user can accept in thirty seconds, not five options. Fill `assets/DIRECTION.md`:
moodboard citations, references, donors, conventions you won't break, the rejected pole, the DNA
blend, the personality's interaction rules, **typography chosen for this brief** (and why not the
default faces), the one signature move where boldness is spent, the supporting system, tokens,
themes, interaction budget.

Then the **plan-then-critique pass**: write the compact plan (palette as 4–6 named values, type
roles, layout as one-line prose plus ASCII wireframes, principles), then work the brief a second
time as if fresh. Any part that matches the defaults list or that you'd produce for any similar
brief gets revised, and you say what changed. Only then build.

Close with **one question** about whatever the mood board left genuinely open. Colour, type scale
and easing are yours to decide and defend. Detail: `references/direction.md`.

**Exit:** `docs/DIRECTION.md` written and critiqued; direction agreed, or stated and proceeding.

## Phase 4 — Content and architecture, then stack

**Content architecture first** (`references/content.md`): decide per content type what is a short
page, what is a long read (chapters, contents with reading times, progress rail) and what must be its
own page (changelog, report-a-bug with real actions, install). Neither one giant document nor nine
thin pages. Give every page a **word budget**; cut copy that doesn't help someone act.

Then the page inventory, content model and rendering decision (`references/architecture.md`):
*will any URL be read by a machine that does not run JavaScript?* Also settle metadata per route
(`references/seo.md`), quality gates in scope (`references/quality-gates.md`), responsive strategy,
and redirects for any URL that moves.

**Exit:** `docs/ARCHITECTURE.md` with content-type decisions, word budgets, inventory, content
model, stack decision record, metadata plan, scoped gates, redirect map.

## Phase 5 — Design system

Tokens locked before the first component: primitive → semantic → component, components touch
semantic only. One accent, typefaces from Phase 3, fluid sizes, and light/dark/system from the
start, plus forced-colors and high-contrast. `references/design-system.md`.

**Exit:** changing the accent and the two ground colours reskins the site with no other edit; every
theme passes contrast.

## Phase 6 — Build

Fill `assets/BUILD-KICKOFF.md` and build, or hand it to another session. Build order: tokens →
layout shell → content model → routes → components → motion → metadata. Finish one route completely
before starting the next.

While building: motion within budget and spent in one orchestrated moment (`references/motion.md`);
copy within its word budget and written to the rules in `references/content.md`; quality gates and
build hygiene from `references/quality-gates.md` (content-hashed assets, redirect stubs, four
states, accessibility). Watch CSS specificity: a type selector and a class fighting over section
padding is the usual cause of uneven rhythm.

**Everything not scoped for v1 becomes tracked work**: `scripts/create-issues.sh` against
`assets/backlog.md`, or one briefed subagent per area. Skipping is the user's decision; unmentioned
is not.

**Exit:** the scoped routes build and render; the deferred backlog exists as issues or briefed work.

## Phase 7 — Verify

**Screenshot it and read the images**, at **375px mobile and 1440px desktop**, in every theme.
Check horizontal overflow and console errors on every route. Run `scripts/verify.mjs`, then the
checklist in `references/verification.md`. Look cold, or hand the images to a subagent; fix the
real defects, re-check what changed, stop. Before calling it done, remove one accessory.

**Do not ship while** any of these holds: a console error, horizontal overflow, unreadable text at
any breakpoint, a route that 404s (including old URLs), focus that disappears, contrast below
threshold in any theme, motion that ignores `prefers-reduced-motion`, or a preview serving a stale
stylesheet.

---

## Reference files

Read the one the phase needs.

| File | Phase |
|---|---|
| `references/moodboard.md` | 0 — asking, reading a board, collection sources, worked example |
| `references/personality.md` | 1 — personality → cursor, hover, scroll, page model, density |
| `references/discovery.md` | 2 — competitors, adjacent niches, reference validation, reviews |
| `references/direction.md` | 3 — the defaults, typography, boldness, art direction, budget, critique |
| `references/content.md` | 4 and 6 — content architecture, word budgets, writing in design |
| `references/architecture.md` | 4 — inventory, content model, rendering and stack, redirects |
| `references/seo.md` | 4 and 6 — metadata, OG, sitemap, JSON-LD, Core Web Vitals |
| `references/design-system.md` | 5 — tokens, theming, type setting, depth |
| `references/motion.md` | 6 — restraint, values, primitives, failure modes |
| `references/quality-gates.md` | 6 — build hygiene, accessibility, states, types, security, tests |
| `references/verification.md` | 7 — screenshot loop and pre-ship checklist |

## Assets and scripts

| Path | Purpose |
|---|---|
| `assets/MOODBOARD.md` | Phase 0 → `docs/MOODBOARD.md` |
| `assets/BRIEF.md` | Phase 1 → `docs/BRIEF.md` |
| `assets/DIRECTION.md` | Phase 3 → `docs/DIRECTION.md` |
| `assets/ARCHITECTURE.md` | Phase 4 → `docs/ARCHITECTURE.md` |
| `assets/BUILD-KICKOFF.md` | Phase 6 — the prompt that starts a building session |
| `assets/backlog.md` | Quality backlog with acceptance criteria |
| `scripts/create-issues.sh` | Files the backlog via `gh`; idempotent, `--dry-run`, `--yes` |
| `scripts/verify.mjs` | Playwright sweep: routes × 375/1440 × themes, overflow, console, reduced motion, stale assets |

The `docs/` files are the deliverable: what a building session in another tool needs to produce the
same result.

## Framework note

Phase 4 can choose Astro, SvelteKit, Nuxt, Remix, plain static HTML or a SPA. Examples use Next.js
App Router conventions because it is the most common choice. The principles port; the file names
don't. Translate the mechanism and keep the requirement.
