# Content

Contents: [People do not read](#people-do-not-read) · [Word budgets](#word-budgets) · [Content architecture](#content-architecture) · [Writing in design](#writing-in-design)

## People do not read

They scan for the thing that lets them act, and leave when they can't find it. Every sentence on a
page competes with the one action that page exists for. Words appear in a design for one reason: to
make it easier to understand and use. They are design content, not decoration.

So: **show, don't tell.** A screenshot, a live demo, a 6-second loop or one real example beats a
paragraph describing it. A number beats an adjective. A working "Copy install command" beats a
section about how easy installation is.

## Word budgets

Give every page a budget in Phase 4 and record it in ARCHITECTURE.md. Count visible words, excluding
nav and footer. Starting points:

| Page type | Budget | Notes |
|---|---|---|
| Home / landing | 80–200 | Hero line ≤ 10 words, sub-line ≤ 25. Shorter than you think |
| Product / feature | 150–400 | One idea per section; each section ≤ 40 words plus a visual |
| Pricing | 100–300 + table | The table carries it; FAQ answers ≤ 50 words each |
| About | 150–400 | |
| Install / get started | as many as the steps need, no more | Commands are content; prose around them is not |
| Changelog entry | 10–60 per change | What changed for the user, not the commit message |
| Long read (docs, essay, guide, report) | uncapped | Structured as below, not budgeted |
| Kids product screen | ≤ 15 | Pictures and sound carry the rest |

**Cutting pass,** before build and again at screenshot review. For each sentence ask: does this help
someone act or decide? If not, cut it. Then cut:

- Openers that restate the heading.
- Adjectives about the product ("powerful", "seamless", "beautiful").
- Feature lists that a screenshot already shows.
- Any second sentence that says the first one again.
- Labels above content that the content already makes obvious.

If a page is over budget, the fix is usually structural: move detail to its own page or behind a
disclosure, not tighter prose.

## Content architecture

Before restyling, and before building, decide **per content type** how it is presented. Two failures
bracket the right answer: collapsing everything into one long document (nobody finds anything, the
home page becomes a manual) and splitting everything into many thin pages (every click lands on
three sentences and a footer). Neither is a style problem; restyling either one leaves it broken.

Classify every piece of content:

| Type | Signals | Treatment |
|---|---|---|
| **Short page** | One job, scannable in 30 seconds, read by everyone | Its own route, within budget. Home, pricing, a feature |
| **Long read** | Read start to finish by people who chose to; > ~1,200 words | One route with chapters, a contents list with reading times per chapter, a progress rail, anchor links, back-to-top. Don't split into one page per chapter unless chapters are independently useful |
| **Reference** | Looked up, not read; many entries | Index + detail, search or filter, deep-linkable entries |
| **Must be its own page** | Linked to from elsewhere, updated on its own cadence, or carries an action | Changelog (dated, newest first, RSS if anyone follows it); report-a-bug (real actions: a pre-filled GitHub issue link with template, labels and environment, or a form that posts somewhere); install (copyable commands, platform tabs, verification step); status; security disclosure; legal |
| **Inline detail** | Supports one page, not wanted by most readers | Disclosure (`<details>`), tooltip or footnote on that page |

A real action means the click does the thing. A bug-report page that says "please report bugs on
GitHub" is a dead end; a button that opens
`https://github.com/OWNER/REPO/issues/new?template=bug.yml&labels=bug&title=...&body=...` with the
version and browser pre-filled is a page doing its job. URL-encode the body and keep it under ~8k
characters.

**Redesigns:** inventory the current content first, classify it with this table, and fix the
architecture before any styling. If URLs move, keep the old ones working with redirects or redirect
stubs (see `architecture.md`).

## Writing in design

- **Write from the user's side.** Name things by what users understand, not how the system is built:
  people manage notifications, not webhook config. Describe what something does in plain terms
  rather than selling it. Specific beats clever.
- **Active voice, exact verbs.** A button says what happens: "Save changes", not "Submit". An action
  keeps its name through the whole flow: "Publish" produces a toast that says "Published".
  Consistent vocabulary is how people learn their way around.
- **Failure and emptiness give direction, not mood.** Say what went wrong and how to fix it, in the
  interface's voice. Errors don't apologise and are never vague. An empty screen is an invitation to
  act, with the action on it.
- **Tone:** plain verbs, sentence case, no filler, matched to the audience. Each element does one
  job.
- **Real content from the start.** Build with the brief's real subject and copy. Placeholder copy
  makes a design feel as templated as default styling, and hides overflow bugs.
- **Typographic chrome is content too.** Eyebrow labels, numbering, dividers and meta strings must
  encode something true about the content (see the defaults list in `direction.md`). Numbered markers
  only for real sequences.
