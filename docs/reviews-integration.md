# Reviews integration: live Google ratings and a moderation panel

Status: proposal, not started. Written 2026-10-28.

## Goal

1. Keep the Google rating and review count on the site up to date automatically, instead of the hard-coded
   "Rated 4.9 on Google from 24 reviews".
2. Let the Deterville Law Office team choose which reviews appear on the site, through a private moderation
   panel only they can access.

## Which Google API

| | Places API | Google Business Profile API |
|---|---|---|
| Access | Any API key | Business owner via Google login (OAuth), after Google approves API access |
| Rating and count | Yes | Yes |
| Reviews returned | At most 5, chosen by Google, often truncated | All reviews, full text, with replies |
| Storing reviews | Restricted: Google's terms allow only short-term caching (around 30 days), no permanent archive | The business's own data |
| Reply to reviews | No | Yes |
| Effort | An afternoon | Access application (days to weeks) plus a one-time owner login |

**Decision:** Places API is enough for the live rating and count. Moderation needs the Business Profile API: with
Places you'd only be choosing from at most 5 reviews Google picked, and you couldn't keep them.

Facebook reviews would work the same way (Graph API with a Page access token and Meta app review). Leave them out at
first.

## Architecture

The site is static on GitHub Pages, so it can't hold secret keys or a login. Secrets and the panel live on
Cloudflare (mostly free tier):

```
Google Business Profile API
        │  nightly scheduled job (Cloudflare Worker, cron trigger)
        ▼
  Cloudflare D1 (SQLite)
  reviews: id, author, stars, text, date, status = pending | approved | hidden, display_name
  summary: average_rating, total_count, fetched_at
        │
        ├──► /admin panel (Worker + small page)
        │      protected by Cloudflare Access: allow-listed team emails, one-time code by email
        │      Approve / Hide / (optional) reply, choose how the name is shown
        │      any change → triggers a site rebuild
        │
        └──► Astro build
               reads approved reviews + summary (fetched at build time from the Worker)
               renders QuoteRow, /testimonials and the rating line
```

### Flow

1. **Nightly:** the job pulls new reviews and the current average and count. New reviews arrive as `pending`.
2. **Moderation:** the team opens `/admin`, signs in with an email code, and approves or hides reviews. No GitHub
   accounts or passwords needed.
3. **Publish:** each approval triggers a rebuild (a GitHub Actions `workflow_dispatch`, or a deploy hook if the site
   moves to Cloudflare Pages). The site updates within about a minute.
4. **Counts:** the rating and count refresh nightly whether or not anything is approved.
5. **The site stays static:** no runtime API calls, nothing to break for visitors, no Google keys in the browser.

### Changes in this repo

- `src/data/site.ts`: `firm.rating` and `testimonials` become build-time data fetched from the Worker, with the current
  values kept as a fallback if the fetch fails.
- `QuoteRow`, `ReviewQuote`, `RatingBadge`, the footer rating line and `/testimonials` keep their markup; only the data
  source changes.
- `.github/workflows/deploy.yml`: add a `workflow_dispatch` trigger (and optionally a nightly `schedule`) so the panel
  and the count job can trigger rebuilds.
- `BaseLayout.astro`: remove `aggregateRating` from the JSON-LD (see compliance note 2).

Moving hosting from GitHub Pages to Cloudflare Pages would keep everything in one account, but it isn't required.

## Lighter alternatives

- **Rating only, no panel:** a scheduled GitHub Action calls the Places API daily, writes `rating.json` and rebuilds.
  No database, no login. Reviews stay hand-picked in `site.ts`, as now.
- **Panel without the API:** the team pastes in chosen reviews through a Git-based CMS (Decap CMS). No Google approval
  needed, but it's manual and the team would need GitHub accounts.
- **Paid widgets** (Elfsight, Trustindex and similar): sync and filtering out of the box, but they add third-party
  scripts and branding and look generic.

## Compliance notes (settle before building)

1. **Law Society of Ontario marketing rules (Rule 4.2).** Lawyers' marketing must not be misleading. Showing only
   approved reviews is common practice, but the published rating and count should be the real Google figures, and the
   page shouldn't imply the reviews shown are all of them. Something like "A selection of reviews; see all on Google"
   with a link covers it. Confirm against the current LSO rules before launch.
2. **Google review markup.** The site's JSON-LD currently includes `aggregateRating`. Google treats a business's own
   review markup as "self-serving" and doesn't show star snippets for it, so it adds nothing in search. Remove it
   rather than wiring it to live data.
3. **Reviewers' names.** Google reviews are public, but republishing names on the firm's own site is a judgement call.
   The panel can offer a per-review choice: full name, first name and initial, or anonymous.
4. **Access and ownership.** The firm owns the Google Business Profile, so they authorise API access. The Worker and
   panel can run in either the developer's or the firm's Cloudflare account; decide who owns it long term.
5. **Google terms.** Show Google attribution next to Google reviews and the rating, and follow the Maps Platform /
   Business Profile API policies on storage and display.

## Phases

1. **Live count** (about 1 day, no approval needed): daily Places API job updates the rating and count; remove the
   JSON-LD `aggregateRating`.
2. **Business Profile API and the moderation panel** (about 3–5 days once access is granted): apply for API access
   early, since approval is the slowest step. Then build the nightly job, the D1 database, `/admin` behind Cloudflare
   Access, approve/hide, and the rebuild trigger.
3. **Extras:** replying to reviews from the panel, Facebook reviews, and an email digest to the team when new reviews
   arrive.

## Open questions

- Which Google account owns the Business Profile, and who on the team should have panel access?
- Should the panel live in the developer's or the firm's Cloudflare account?
- Keep GitHub Pages, or move hosting to Cloudflare Pages?
- How should reviewer names be shown by default?
