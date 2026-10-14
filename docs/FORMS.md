# Contact and wholesale forms

Both forms live in `src/components/InquiryForm.astro` and are handled by `src/scripts/site.ts`.

## How delivery works today

No form service is connected, so on submit the form:

1. checks required fields, email format and phone format (highlighting anything wrong);
2. opens the visitor's email app with a message addressed to `site.email`
   (`src/config/site.ts`), the subject pre-filled and every field written out as plain text;
3. shows a confirmation, plus the email address in case no email app opened.

Nothing is stored on the website. **Make sure `hello@woodfoxcoffee.com` exists** (or change
`site.email`), because every inquiry goes there.

Spam protection: a hidden "honeypot" field silently drops bot submissions, inputs have length limits,
and control characters are stripped.

## Receiving submissions directly (recommended before launch)

Visitors without a desktop email app (common on shared or work computers) can't use the email-app
method. To receive submissions as emails without that step, connect a form service:

1. Create a free form at [Formspree](https://formspree.io) (or Basin, Getform, etc.) that forwards to
   your inbox.
2. Paste its endpoint into `src/config/site.ts`:
   ```ts
   export const forms = {
     contact: 'https://formspree.io/f/xxxxxxx',
     wholesale: 'https://formspree.io/f/yyyyyyy',
   };
   ```
3. Push. The forms then post directly, showing "Sending…", success and error states.

## Fields

| Form | Fields |
| --- | --- |
| Contact | topic (general / wholesale / collaboration), name, email, message |
| Wholesale | name, business name, email, phone (optional), business type, estimated coffee needs, message |

## Newsletter

The email signup was removed because no newsletter service is connected yet. Once one is chosen
(e.g. Kit, Buttondown, Mailchimp), a signup section can be added back.
