/**
 * Example Cloudflare Worker that turns a Woodfox cart into a Stripe Checkout Session.
 * NOT deployed. See docs/COMMERCE.md for setup.
 *
 * Secrets (set with `wrangler secret put`): STRIPE_SECRET_KEY
 * Vars: SITE_URL (e.g. https://woodfoxroasters.com)
 *
 * Note: Stripe Checkout can't mix one-time and subscription items that bill on
 * different intervals in one session. This example uses subscription mode when
 * any item is a subscription; one-time items are then added to the first invoice.
 */
export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.SITE_URL,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors });

    const { items = [] } = await request.json();
    const valid = items.filter((i) => typeof i.price === 'string' && i.price.startsWith('price_'));
    if (!valid.length || valid.length !== items.length) {
      return Response.json({ error: 'Some items are not available for checkout yet.' }, { status: 400, headers: cors });
    }

    const subscription = valid.some((i) => i.subscription);
    const form = new URLSearchParams();
    form.set('mode', subscription ? 'subscription' : 'payment');
    form.set('success_url', `${env.SITE_URL}/checkout/?status=success`);
    form.set('cancel_url', `${env.SITE_URL}/checkout/`);
    form.set('shipping_address_collection[allowed_countries][0]', 'US');
    form.set('allow_promotion_codes', 'true');
    valid.forEach((item, n) => {
      form.set(`line_items[${n}][price]`, item.price);
      form.set(`line_items[${n}][quantity]`, String(Math.max(1, Math.min(20, item.quantity | 0))));
    });
    form.set('metadata[cart]', JSON.stringify(valid.map(({ id, size, grind, subscription }) => ({ id, size, grind, subscription }))).slice(0, 500));

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form,
    });
    const session = await res.json();
    if (!res.ok) return Response.json({ error: session.error?.message || 'Stripe error' }, { status: 502, headers: cors });
    return Response.json({ url: session.url }, { headers: cors });
  },
};
