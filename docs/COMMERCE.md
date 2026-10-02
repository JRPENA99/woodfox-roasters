# Adding checkout later

The site is already structured for this flow:

```
Woodfox website → coffee page → Buy → secure hosted checkout (Stripe or Shopify)
```

The website stays Woodfox-owned. The payment provider handles card details, tax and receipts on
its own secure page, so the site never needs a backend or a cart.

## How it works today

Each coffee file in `src/content/coffees/` can have:

```yaml
status: available      # upcoming | available | sold-out
price: "$22"
size: 12 oz
buyUrl: https://buy.stripe.com/…
```

When `status` is `available` and `buyUrl` is set, the coffee page shows **Buy — $22 / 12 oz**,
linking straight to checkout. Otherwise it shows "Coming soon" or "Sold out" with a link to join
the list.

## Option A — Stripe Payment Links (simplest)

1. In the Stripe Dashboard, create a Product for the coffee with its price.
2. Create a **Payment Link** for it. Turn on shipping address collection and set shipping rates.
3. Paste the link into the coffee's `buyUrl`.
4. Set the success URL in Stripe to a thank-you page (e.g. add `src/pages/thanks.astro`).

No code changes are needed. Inventory is handled by updating `status` when a coffee sells out.

## Option B — Shopify (if you want inventory, subscriptions or a larger catalogue)

1. Use Shopify's **Starter** plan (or any plan) as the commerce back end.
2. For each product, copy the product's checkout or "buy button" link into `buyUrl`.
3. Later, if you want a cart that stays on woodfoxroasters.com, Shopify's Storefront API can be
   added. That is a larger change and not needed to start selling.

## When to revisit

Once there are more than a handful of coffees, or subscriptions become important, it is worth
looking at a dedicated cart. Until then, one link per coffee keeps things simple and fast.
