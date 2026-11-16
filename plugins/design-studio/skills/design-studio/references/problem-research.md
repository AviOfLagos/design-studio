# Problem research

Contents: [Why](#why) · [Scope and sample](#scope-and-sample) · [Sources](#sources) · [Method](#method) · [Output](#output) · [Without a browser](#without-a-browser)

## Why

Competitor research tells you what the category looks like. Review mining tells you what users say
about specific products. This pass looks for **the problem itself**: what goes wrong for people
doing this task anywhere, and what goes wrong for developers building it. Most products in a
category share the same handful of failures. Find them before you build, so you skip them instead
of rediscovering them.

No user gate: run it, then disclose what you found in DIRECTION.md and ARCHITECTURE.md.

## Scope and sample

| Scope | What you search for | Sample |
|---|---|---|
| **Feature** (a checkout, an onboarding flow, a search box) | the feature's task in plain words: "split payment", "multi-step signup", "search filters" | 3–4 sources, ~30–60 items read; stop when new items stop adding new problems |
| **Whole product** | the category and its top 3–5 competitors by name, plus the core task | all six sources, ~80–150 items; same saturation rule |

Search in the user's words, not the product's: "why does X keep logging me out", "X alternative",
"X is so slow", "hate that X". Add the last 12–18 months as a date filter where the source allows;
older complaints describe products that have since changed.

## Sources

| Source | What it gives you | Query shape |
|---|---|---|
| **App Store / Google Play** | friction in shipped mobile products | competitor listing → reviews, sort by most recent, read 2★–4★ first (method: `discovery.md` → *Mining user reviews*) |
| **Reddit** | the most honest signal, and what people switched to | `site:reddit.com "<competitor>" (alternative OR hate OR switched)`; relevant subreddits sorted by top, past year |
| **X / Twitter** | live frustration and the people talking about it now | `"<competitor>" (broken OR annoying OR "why does")`, Latest tab; note handles that keep coming up |
| **Forums and communities** | detailed, long-form complaints and workarounds | `site:news.ycombinator.com`, Indie Hackers, product-specific forums, Discord or Slack communities if public |
| **Stack Overflow** | where developers get stuck building this | `[tag] <feature>` sorted by votes; highly voted questions with no accepted answer are the hard parts |
| **GitHub issues** | reproducible bugs in the libraries you might use | open issues on the candidate libraries and on open-source competitors, sorted by reactions |

The first four describe **user problems**. The last two describe **build problems**. Keep them in
separate lists; they land in different documents.

## Method

1. **Collect.** Read, don't skim titles. Copy the link and a one-line paraphrase of each problem.
2. **Cluster.** Group items describing the same underlying problem. Name each cluster by what goes
   wrong for the person, not by the product feature ("loses the form when the session expires",
   not "auth").
3. **Count as a rate.** Frequency is items in the cluster divided by items read in that source.
   Never report raw counts alone.
4. **Rank** by frequency × how badly it hurts (blocks the task > costs time > annoys).
5. **Turn each into a recommendation**: a specific thing this build will do differently. If there
   is nothing to do about it, drop it.
6. **Keep 5–8.** Anything below the cut is noise for this build.

## Output

Write the list into DIRECTION.md (user problems) and ARCHITECTURE.md (build problems), under
*Known problems and how we avoid them*. Each row:

| # | Problem | Seen in | Rate | Sources | What we do |
|---|---|---|---|---|---|
| 1 | Checkout loses the cart when the user signs in mid-flow | 3 of 5 competitors | 11% of 2★–3★ reviews read | [r/…](link), [App Store](link) | Cart lives server-side keyed to a guest id; merge on sign-in |
| 2 | Stripe webhook arrives before the order row is committed | — | 14 SO questions, 2 open library issues | [SO](link), [GH](link) | Idempotent handler; retry on missing row |

Rules: every row has at least one working link; the recommendation is buildable; the whole list
fits on one screen. If the user opted into the social kit, keep the thread links: they feed
`docs/SOCIAL.md` → *Conversations to join*.

## Without a browser

If you cannot search, say so in the deliverable, write the list from what you know with every row
marked **unverified**, and give the user the exact search queries from the table above so they can
check in five minutes. Never invent a link.
