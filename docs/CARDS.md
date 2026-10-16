# NFC business cards

Private digital business cards, opened by tapping a PVC NFC card or scanning its QR code.

| Card | URL to program on the NFC chip |
| --- | --- |
| Tony Luna, Founder & Owner | `https://woodfoxcoffee.com/card/tony-shytecw4/` |

## Privacy

- The URL has a random suffix, so it can't be guessed.
- Pages carry `noindex, nofollow, noarchive, nosnippet`, are not in the sitemap, and are not linked from
  anywhere on the website.
- They're deliberately **not** listed in `robots.txt`, because that file is public and would reveal the
  addresses.
- Anyone who has the link can open and share it. That's how a business card works.
- The details are in this repository's source code; keep the repository **private** so they can't be
  browsed on GitHub. (GitHub Pages from a private repo needs a paid GitHub plan.)

## Files

| File | Purpose |
| --- | --- |
| `src/data/cards.ts` | Card profiles and the vCard generator |
| `src/components/card/BusinessCard.astro` | Shared design (black and copper, swirls, QR, actions) |
| `src/pages/card/[slug]/index.astro` | The card page |
| `src/pages/card/[slug]/[vcf].ts` | The downloadable `.vcf` contact file |

## Adding a card (e.g. the shared event cards)

1. Generate a random suffix:
   ```bash
   node -e "const c=require('crypto'),a='abcdefghjkmnpqrstuvwxyz23456789';let s='';for(const b of c.randomBytes(8))s+=a[b%a.length];console.log(s)"
   ```
2. Add a profile to `cards` in `src/data/cards.ts` (slug, names, initials, title, phone, emails, vCard
   file name).
3. Build, push, and check the live page before programming the chip.

**Never change a slug after a card has been programmed.**

## Before programming a chip

1. Open the URL on an iPhone (Safari) and an Android phone (Chrome).
2. Tap **Save Contact**: the contact should open with name, title, company, phone, both emails and the
   website. Save it, then check it in Contacts.
3. Tap Call, Text, Email and Website.
4. Scan the on-screen QR code with another phone: it should open the same card.
5. Try **Copy link / Share link**.
6. Program the chip with the exact URL above (including the trailing slash) and tap it to confirm.

---

# Event cards (Woodfox Coffee, Event Team)

Three identical general-business cards for anyone representing Woodfox at events. They're
separate from Tony's card: no personal details, separate files, and Tony's card is untouched.

| Card | URL to program on the NFC chip |
| --- | --- |
| Event card 1 | `https://woodfoxcoffee.com/card/event-01/` |
| Event card 2 | `https://woodfoxcoffee.com/card/event-02/` |
| Event card 3 | `https://woodfoxcoffee.com/card/event-03/` |

Each page has its own QR code pointing to its own URL, and its own `Woodfox-Coffee.vcf`.

## Phone number

The event cards use the Google Voice business number **(713) 742-4040** for the Call button, the
details list and the vCard. (There's no Text button.) To change it, edit `phone` and `phoneDisplay` in
`src/data/eventCards.ts`, then build and push. Every event card and its vCard update at once.

## Assigning a card to a person later

Give that card an override in `eventCards`, e.g.

```ts
{ id: '02', profile: { name: 'Jane Doe', subtitle: 'Wholesale', email: 'jane@woodfoxcoffee.com', vcfName: 'Jane-Doe-Woodfox-Coffee.vcf' } },
```

The URL stays the same, so the physical card doesn't need reprogramming.

## Files

| File | Purpose |
| --- | --- |
| `src/data/eventCards.ts` | Shared profile, the three cards, per-card overrides |
| `src/lib/vcard.ts` | vCard 3.0 builder (escaping, folding, CRLF) |
| `src/components/card/EventCard.astro` | Event card layout |
| `src/components/card/SilkBackground.astro` | Reusable animated silk background |
| `src/components/card/ContactActions.astro` | Circular Call/Text/Email/Website buttons |
| `src/components/card/CardQR.astro` | Build-time QR code |
| `src/pages/card/event-[n]/index.astro` | The three pages |
| `src/pages/card/event-[n]/[vcf].ts` | The three vCard files |
