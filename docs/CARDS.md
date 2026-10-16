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
