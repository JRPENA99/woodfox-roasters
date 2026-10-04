# Shop, cart and checkout

The shop is built and running in **preview mode**: products, prices and images are placeholders,
and the checkout button explains that payment isn't live yet. No payment can be taken.

```
/shop/            → browse and filter products
/shop/<product>/  → choose size, grind, one-time or subscription, quantity
/checkout/        → review cart, edit, see subscription savings, pay
                     → secure hosted payment page (Stripe, or another provider)
```

The cart is stored in the visitor's browser, so no accounts, database or server are needed for the
shop itself. Card details are only ever entered on the payment provider's own page.

## Where things live

| What | File |
| --- | --- |
| Products, prices, sizes, subscription discount and frequencies | `src/data/products.ts` |
| Checkout settings (provider, endpoint) | `src/config/site.ts` → `checkout` |
| Shop page | `src/pages/shop/index.astro` |
| Product page | `src/pages/shop/[id].astro` |
| Cart & checkout page | `src/pages/checkout.astro` |
| Cart logic | `src/scripts/cart.ts` |
| Placeholder bag artwork | `src/components/BagArt.astro` |

## Replacing placeholder products

In `src/data/products.ts`, edit each product's `name`, `notes`, `description`, `sizes` and prices
(in cents: 2200 = $22). Set `placeholder: false`. Remove the "Preview" notices in
`shop/index.astro`, `shop/[id].astro` and `checkout.astro` once everything is real.

Change the subscription discount in one place: `subscription.discount` (0.15 = 15%).

## Turning on Stripe

GitHub Pages only serves static files, and Stripe needs a tiny piece of server code to create a
checkout session securely (your secret key must never be in the website itself). The cleanest option
is a free **Cloudflare Worker** (or a Netlify/Vercel function).

1. **In Stripe**, create a Product for each coffee and size, with:
   - a one-time Price, and
   - for subscribable coffees, a recurring Price at the discounted amount for each frequency you offer
     (or one recurring price per size, and use Stripe's interval settings).
2. Copy the Price IDs (`price_…`) into `stripePrice` / `stripeSubscriptionPrice` on each size in
   `products.ts`.
3. **Deploy the function** in `docs/stripe-checkout-worker.js` as a Cloudflare Worker. Add your Stripe
   secret key as a Worker secret called `STRIPE_SECRET_KEY`. It is never stored in this repository.
4. In `src/config/site.ts`, set:
   ```ts
   export const checkout = { provider: 'endpoint', endpoint: 'https://<your-worker>.workers.dev', currency: 'USD' };
   ```
5. Push. The checkout button now opens Stripe Checkout with the cart's contents. Stripe handles cards,
   Apple Pay / Google Pay, shipping address, tax, receipts and subscription billing. Customers manage
   subscriptions (skip, pause, cancel) through Stripe's customer portal.

Test everything with Stripe's **test mode** keys first.

## Using a different provider

The checkout page sends the cart as JSON to whatever `endpoint` you configure and redirects to the
`url` it returns. Any provider with a hosted checkout works the same way:

- **Shopify**: create a cart with the Storefront API in the function and return its `checkoutUrl`.
- **Square**: create a Payment Link via the Checkout API and return its URL.
- **PayPal**: create an Order and return the approval link.

Only the function changes; the website stays the same.
