/**
 * Digital NFC business cards.
 *
 * Each card is a private, unlisted page at /card/<slug>/ plus a downloadable
 * vCard. Slugs include a random suffix so the pages can't be guessed; they are
 * never linked from the site, are excluded from the sitemap and carry noindex.
 *
 * To add a card (e.g. the shared event cards), add an entry here with a new
 * random slug. Generate one with:
 *   node -e "const c=require('crypto'),a='abcdefghjkmnpqrstuvwxyz23456789';let s='';for(const b of c.randomBytes(8))s+=a[b%a.length];console.log(s)"
 *
 * The slug is programmed onto a physical card, so never change it once issued.
 */

export type CardProfile = {
  /** Permanent, unguessable URL segment. */
  slug: string;
  firstName: string;
  lastName: string;
  initials: string;
  title: string;
  org: string;
  /** E.164 format, e.g. +17135694040 */
  phone: string;
  /** Shown to people, e.g. +1 713-569-4040 */
  phoneDisplay: string;
  email: string;
  secondaryEmail?: string;
  website: string;
  /** Downloaded vCard file name. */
  vcfName: string;
};

export const cards: CardProfile[] = [
  {
    slug: 'tony-shytecw4',
    firstName: 'Tony',
    lastName: 'Luna',
    initials: 'TL',
    title: 'Founder & Owner',
    org: 'Woodfox Coffee',
    phone: '+17135694040',
    phoneDisplay: '+1 713-569-4040',
    email: 'tony@woodfoxcoffee.com',
    secondaryEmail: 'hello@woodfoxcoffee.com',
    website: 'https://woodfoxcoffee.com',
    vcfName: 'Tony-Luna-Woodfox-Coffee.vcf',
  },
];

export const fullName = (c: CardProfile) => `${c.firstName} ${c.lastName}`;
export const cardPath = (c: CardProfile) => `/card/${c.slug}/`;
export const vcfPath = (c: CardProfile) => `/card/${c.slug}/${c.vcfName}`;

/** Escape a vCard 3.0 text value (RFC 2426 §4). */
const esc = (v: string) => v.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

/** Fold lines longer than 75 octets (RFC 2425 §5.8.1). */
function fold(line: string): string {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let current = '';
  let size = 0;
  for (const ch of line) {
    const n = new TextEncoder().encode(ch).length;
    const limit = out.length === 0 ? 75 : 74; // continuation lines start with a space
    if (size + n > limit) {
      out.push(current);
      current = '';
      size = 0;
    }
    current += ch;
    size += n;
  }
  out.push(current);
  return out.join('\r\n ');
}

/** Build a vCard 3.0 string with CRLF line endings. */
export function toVCard(c: CardProfile): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(c.lastName)};${esc(c.firstName)};;;`,
    `FN:${esc(fullName(c))}`,
    `ORG:${esc(c.org)}`,
    `TITLE:${esc(c.title)}`,
    `TEL;TYPE=CELL:${c.phone}`,
    `EMAIL;TYPE=INTERNET,WORK,PREF:${c.email}`,
    ...(c.secondaryEmail ? [`EMAIL;TYPE=INTERNET,WORK:${c.secondaryEmail}`] : []),
    `URL:${c.website}`,
    'END:VCARD',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}
