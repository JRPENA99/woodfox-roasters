# Connecting the forms

There are three forms. Each one reads its destination from `src/config/site.ts`:

```ts
export const forms = {
  newsletter: '',   // "Join the list" signup
  contact: '',      // Contact page
  wholesale: '',    // Wholesale page
};
```

While a value is empty, the form checks the input and then tells the visitor plainly that
nothing was sent. Once you paste in a URL, the form sends its fields to that URL (an HTML form
POST over `fetch`, asking for a JSON reply) and shows a thank-you message.

## Recommended options (no backend needed)

**Contact and wholesale:** any form-to-email service that accepts a standard POST.

- [Formspree](https://formspree.io): create a form, copy its endpoint (`https://formspree.io/f/xxxx`) into `contact` and `wholesale`. You can use the same endpoint for both. Each submission includes a hidden `form` field (`contact` or `wholesale`) so you can tell them apart.
- [Basin](https://usebasin.com) works the same way.
- If the site is hosted on **Netlify**, Netlify Forms can be used instead. Add `data-netlify="true"` and a `name` attribute to the `<form>` tags in `src/components/InquiryForm.astro`.

**Email list:** use the provider you'll send newsletters from.

- **Kit (ConvertKit), Buttondown, Mailchimp** all provide a form action URL in their "embed form" settings. Paste that URL into `newsletter`. The email field is named `email`. If your provider expects another name (Mailchimp uses `EMAIL`), change the `name` attribute in `src/components/SignupForm.astro`.

## Fields sent

| Form | Fields |
| --- | --- |
| Newsletter | `email`, `source` (which page) |
| Contact | `form`, `topic` (general / wholesale / collaboration), `name`, `email`, `message` |
| Wholesale | `form`, `name`, `email`, `business`, `business_type`, `city`, `website`, `message` |

All forms include a hidden `company_website` field as a simple spam trap. Submissions where it is
filled are silently ignored.
