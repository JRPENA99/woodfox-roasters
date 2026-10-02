# Woodfox Roasters — website prototype

A fast, static marketing site for Woodfox Roasters, built with [Astro](https://astro.build).
No database, no backend, no accounts. It builds to plain HTML/CSS with about 3 KB of JavaScript.

## Run it

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # local preview at http://localhost:4321
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Where things live

| What | Where |
| --- | --- |
| Pages (one file per page) | `src/pages/` — `index.astro`, `coffee/`, `sourcing.astro`, `about.astro`, `wholesale.astro`, `contact.astro`, `404.astro` |
| Site settings: email, location, navigation, form endpoints, hero video | `src/config/site.ts` |
| Every photo (one list) | `src/data/images.ts` |
| Coffees (one Markdown file each) | `src/content/coffees/` — start from `_TEMPLATE.md` |
| Shared pieces (header, footer, forms, cards) | `src/components/` |
| Colors, fonts, spacing, buttons | `src/styles/global.css` (variables at the top) |
| Page-specific styling | the `<style>` block at the bottom of each page or component |
| The only JavaScript | `src/scripts/site.ts` |
| Your own images and video | `public/media/images/` and `public/media/video/` |

## Editing text

Page copy is plain text inside each file in `src/pages/`. Open the page, find the sentence,
change it, and save. The dev server refreshes the browser automatically.

## Adding a coffee

1. Copy `src/content/coffees/_TEMPLATE.md` to e.g. `mexico-chiapas.md`.
2. Fill in what you know; delete lines you don't.
3. Set `draft: false`.

The coffee then appears on the homepage and Coffee page, and gets its own page at
`/coffee/mexico-chiapas/`. The "coming soon" panel disappears automatically once at least
one coffee is published.

## What is still placeholder

- **All photography** comes from Unsplash (free licence) and should be replaced with Woodfox's own. See `docs/MEDIA.md`.
- **Hero video** streams from the live woodfoxroasters.com. Add an optimized copy to the project before launch (see `docs/MEDIA.md`).
- **Email address** `hello@woodfoxroasters.com` in `src/config/site.ts` needs to be confirmed.
- **Location** "Houston, Texas" comes from the current site. Change or clear it in `src/config/site.ts`.
- **Forms** are not connected yet. They validate input and then tell the visitor nothing was sent. See `docs/FORMS.md`.
- **Wordmark** is text. Swap in an SVG logo in `src/components/Wordmark.astro` when one exists.
- **Harvest calendar** on the Sourcing page shows general, approximate harvest seasons. It is not a claim about what Woodfox buys. Edit it in `src/components/HarvestCalendar.astro`.

## Further docs

- `docs/FORMS.md` — connecting the email list, contact and wholesale forms
- `docs/MEDIA.md` — replacing photos, preparing the hero video
- `docs/COMMERCE.md` — adding Stripe or Shopify checkout later
- `docs/DEPLOY.md` — putting the site online

## Note on `preserveSymlinks`

`astro.config.mjs` sets `vite.resolve.preserveSymlinks: true`. Without it, the build silently
drops all CSS when the project sits in a redirected or symlinked folder (as it did while this
prototype was built). It has no effect elsewhere, so it is safe to keep.
