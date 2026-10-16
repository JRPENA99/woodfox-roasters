# Contact details, forms and email routing

## Addresses

| Purpose | Address |
| --- | --- |
| General and public contact | hello@woodfoxcoffee.com |
| Orders, shipping and wholesale | orders@woodfoxcoffee.com |
| Phone | 713-742-2709 (`tel:+17137422709`) |

All are set once in `src/config/site.ts` (`email`, `ordersEmail`, `phone`, `phoneHref`) and reused in
the header menu, footer, contact page, wholesale page, policies and structured data.

## How the forms deliver today

There is **no form service or email provider connected** to this static site. On submit, a form
validates the input and then opens the visitor's own email app with the message addressed by category:

| Form / category | Delivered to |
| --- | --- |
| Contact → General | hello@woodfoxcoffee.com |
| Contact → Collaboration or event | hello@woodfoxcoffee.com |
| Contact → Orders & shipping | orders@woodfoxcoffee.com |
| Contact → Wholesale | orders@woodfoxcoffee.com |
| Wholesale form | orders@woodfoxcoffee.com |

The routing lives in `src/components/InquiryForm.astro` (`data-mailto` on the form and on each topic)
and `src/scripts/site.ts`. Spam protection: hidden honeypot field, length limits, control-character
stripping. States: validation errors, "Opening your email app…", and a confirmation that includes the
address in case no email app opened.

## Recommended: receive submissions directly

Visitors without a desktop email app can't use the email-app method. To receive submissions without it,
create two forms in a form service (e.g. Formspree):

- a **contact** form that notifies `hello@woodfoxcoffee.com`, and
- a **wholesale** form that notifies `orders@woodfoxcoffee.com`.

Paste the endpoints into `forms` in `src/config/site.ts`. Note: the contact form has an "Orders &
shipping" and "Wholesale" topic; with a single contact endpoint those messages go to the contact form's
inbox. Either add a routing rule in the form service (forward when `topic` is `orders` or `wholesale`)
or point both endpoints at a service that supports per-field routing.

## Transactional email (order confirmations, shipping updates)

Not applicable yet: online ordering is off and no commerce or email provider is connected, so the site
sends no order confirmations, shipping updates or internal order notifications. When a provider is
chosen (Stripe, Square or Shopify), configure in its dashboard:

- customer emails' **reply-to** (or verified sender) = `orders@woodfoxcoffee.com`
- internal new-order notifications → `orders@woodfoxcoffee.com`
- sender-domain authentication (SPF/DKIM) for woodfoxcoffee.com, as the provider instructs

## Mailboxes

Both inboxes must exist at your email host. This repository can't create or verify mailboxes or DNS
mail records (MX, SPF, DKIM).
