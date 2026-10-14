# Online ordering (not enabled)

Online ordering is **off**. The site shows coffees without prices, carts or checkout, and says
plainly that ordering isn't open yet. Nothing on the site accepts orders or payments.

Everything needed is already built, behind one switch in `src/config/site.ts`:

```ts
export const commerce = { enabled: false, provider: 'none', endpoint: '', currency: 'USD' };
```

## Pieces in place

| Piece | File |
| --- | --- |
| Coffee catalogue (data-driven) | `src/data/products.ts` |
| Collection page | `src/pages/coffee/index.astro` |
| Coffee detail pages (size, grind, one-time or subscription) | `src/pages/coffee/[id].astro` |
| Cart (stored in the visitor's browser) | `src/scripts/cart.ts` |
| Cart & checkout page | `src/pages/checkout.astro` |
| Example Stripe Checkout function | `docs/stripe-checkout-worker.js` |

## Adding real coffees

In `src/data/products.ts`, replace the three placeholders. For each coffee set `status`, origin,
region, species, process, roast, notes, description and an `image` (put photos in
`public/media/images/coffees/`). For sizes that are actually sold, set `price` (cents) and
`available: true`. Placeholders are excluded from the sitemap and hidden from search engines.

## Turning ordering on (needs owner approval)

1. **Choose a provider.** The business plan mentions Square or Shopify Payments; Stripe also works.
   GitHub Pages can't hold secret keys, so a small serverless function creates the checkout session.
   `docs/stripe-checkout-worker.js` is a ready Cloudflare Worker for Stripe. Square and Shopify
   follow the same pattern (the function returns the hosted checkout URL).
2. Create products and prices in the provider; copy their price IDs into `providerPrice` /
   `providerSubscriptionPrice` on each size.
3. Deploy the function with the secret key stored as a provider secret (never in this repository).
4. Set `commerce` to `{ enabled: true, provider: 'endpoint', endpoint: '<function URL>' }`.
5. Finalise the Shipping, Returns, Terms and Privacy pages (remove the highlighted placeholders).
6. Test end-to-end in the provider's **test mode** before going live.

Subscriptions: `subscription` in `products.ts` holds frequencies and the discount (currently 0%;
any discount needs owner approval).
