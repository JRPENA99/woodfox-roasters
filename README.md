# Woodfox Coffee — woodfoxcoffee.com

Website for **Woodfox Coffee Company**, a Houston-based specialty coffee roaster. Built with
[Astro](https://astro.build) as a fast static site and deployed to GitHub Pages.

## Run it

Requires Node.js 20+.

```bash
npm install
npm run dev        # local preview at http://localhost:4321
npm run build      # production build into dist/
npx astro check    # type and template checks
```

Pushing to `main` deploys automatically (see `docs/DEPLOY.md`).

## Where things live

| What | Where |
| --- | --- |
| Company details, navigation, form delivery, ordering switch | `src/config/site.ts` |
| Coffees (data-driven catalogue) | `src/data/products.ts` |
| Every photo | `src/data/images.ts` |
| Pages | `src/pages/` — home, `coffee/`, `sourcing`, `about` (Our Story), `wholesale`, `contact`, `privacy`, `terms`, `shipping`, `returns`, `checkout` |
| Shared pieces (header, footer, forms, cards) | `src/components/` |
| Colours, type, spacing | `src/styles/global.css` (variables at the top) |
| JavaScript | `src/scripts/site.ts` (menu, video, forms), `src/scripts/cart.ts` (only when ordering is on) |
| Images and video | `public/media/` |
| SEO: sitemap, robots, social image | `src/pages/sitemap.xml.ts`, `public/robots.txt`, `public/media/images/og.jpg` |

## Brand

Forest green `#2C3E28` and warm ivory `#F4F0E7` as the foundation, with restrained copper accents:
`#A9692F` for large type, `#8C5627` for small text (meets contrast on ivory), `#D4AE85` on green.
Type: Source Serif 4 and Inter, self-hosted. Product imagery uses the packaging mockups in
`public/media/images/products/`.

## Owner to confirm before relying on it

- **Contact:** hello@woodfoxcoffee.com (general), orders@woodfoxcoffee.com (orders, shipping, wholesale), 713-742-2709 → `src/config/site.ts`; both inboxes must exist (see `docs/FORMS.md`)
- **Logo:** the fox seal artwork isn't in the project yet; the header uses a text wordmark
- **Coffees:** the three entries are packaging concepts, labelled "In development" → `src/data/products.ts`
- **Photography:** most images are Unsplash stand-ins (the hero film and still are Woodfox's own) → `docs/MEDIA.md`
- **Policies:** Privacy, Terms, Shipping and Returns are drafts with highlighted items to confirm
- **Social links:** none listed until confirmed
- **Online ordering:** off until a provider is approved → `docs/COMMERCE.md`

## Docs

`docs/DEPLOY.md` (GitHub Pages, GoDaddy domains) · `docs/FORMS.md` · `docs/COMMERCE.md` · `docs/MEDIA.md`

## Note on `preserveSymlinks`

`astro.config.mjs` sets `vite.resolve.preserveSymlinks: true`; without it, builds from a redirected or
symlinked folder silently drop CSS. It has no effect elsewhere.
