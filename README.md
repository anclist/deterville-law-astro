# Deterville Law Office — Astro rebuild (proposal)

Modern, conversion-focused rebuild of detervillelaw.com. Static Astro site, no UI framework.

```sh
npm install
npm run dev        # http://localhost:4321
npm run build && npm run preview
npm run check      # type-check
```

## Structure

```
src/
  tokens/tokens.ts        # design tokens: primitives → semantic aliases → CSS custom props
  styles/global.css       # reset + element defaults only
  components/
    atoms/                # Button, Icon, Logo, Tag, Stars, Input, Label, Checkbox, Container
    molecules/            # FormField, ReviewQuote, PostCard, Step, FaqItem, RatingBadge, …
    organisms/            # SiteHeader, HomeHero, ServiceColumns, RouteTimeline, QuoteRow, BookingFaq, CtaBand, SiteFooter, …
  layouts/BaseLayout.astro  # <head>, SEO, LegalService JSON-LD, site chrome
  data/                   # firm facts, practices, testimonials, media — all sourced from the live site
  content/blog/           # blog posts (content collection)
  pages/                  # routes; /styleguide documents the design system
```

Components only consume **semantic** tokens (`--color-action`, `--space-5`), never raw palette values.

## Routes

| Old URL | New URL |
| --- | --- |
| `/` `/who-we-are` `/contact-us` `/blog` `/testimonials` `/consultation-documents` `/legal` | unchanged |
| `/media-%26-other-appearances` | `/media` (redirect) |
| `/blog/f/<slug>` | `/blog/<slug>` (redirect) |
| — | `/immigration`, `/wills-estates`, `/notarial-services` (new practice pages) |
| — | `/styleguide` |

## Before launch

- Contact form: set `PUBLIC_FORM_ENDPOINT` (Formspree, Netlify Forms, etc.). Without it the form opens a pre-filled email.
- Subscribe form: set `PUBLIC_SUBSCRIBE_ENDPOINT` to the email service's signup endpoint (Mailchimp, Kit, Buttondown, …; field name `email`). On the current GoDaddy site these signups go to the Websites + Marketing subscriber list; export that list into the new service before switching. Without an endpoint the form opens a pre-filled email to the office.
- Blog: only 3 of ~110 posts are migrated. The rest need exporting from GoDaddy into `src/content/blog/`.
- Practice-page "What we help with" lists are proposals. The firm needs to confirm them.
- Testimonials are the truncated excerpts the review widgets show. Get full quotes and permission.
- Add analytics plus a cookie-consent banner (the legal page references Google Analytics).

- Sister-firm links point at the other proposal preview; switch `sister.href` in `src/data/site.ts` to the live domain at launch.

## Docs
- [Reviews integration](docs/reviews-integration.md): plan for live Google ratings and a review moderation panel.
