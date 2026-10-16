/**
 * Small vCard 3.0 builder for business cards that aren't tied to one person
 * (e.g. the event cards). Tony's card keeps its own generator in
 * src/data/cards.ts.
 */

/** Escape a vCard text value (RFC 2426 §4). */
export const escapeVCard = (v: string) =>
  v.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

/** Fold lines longer than 75 octets (RFC 2425 §5.8.1). */
export function foldVCardLine(line: string): string {
  const enc = new TextEncoder();
  if (enc.encode(line).length <= 75) return line;
  const out: string[] = [];
  let current = '';
  let size = 0;
  for (const ch of line) {
    const n = enc.encode(ch).length;
    if (size + n > (out.length === 0 ? 75 : 74)) {
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

export type VCardInput = {
  /** Display name (FN). */
  name: string;
  /** Person's name parts; omit for an organisation contact. */
  given?: string;
  family?: string;
  org?: string;
  title?: string;
  /** E.164 phone, e.g. +17135551234. Omitted when null/undefined. */
  phone?: string | null;
  emails?: string[];
  url?: string;
  /** City and region for a work address, e.g. ['Houston', 'TX']. */
  locality?: [string, string];
};

export function buildVCard(c: VCardInput): string {
  const e = escapeVCard;
  const isOrg = !c.given && !c.family;
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${e(c.family ?? '')};${e(c.given ?? '')};;;`,
    `FN:${e(c.name)}`,
    ...(c.org ? [`ORG:${e(c.org)}`] : []),
    ...(c.title ? [`TITLE:${e(c.title)}`] : []),
    ...(c.phone ? [`TEL;TYPE=WORK,VOICE:${c.phone}`] : []),
    ...(c.emails ?? []).map((m, i) => `EMAIL;TYPE=INTERNET,WORK${i === 0 ? ',PREF' : ''}:${m}`),
    ...(c.url ? [`URL:${c.url}`] : []),
    ...(c.locality ? [`ADR;TYPE=WORK:;;;${e(c.locality[0])};${e(c.locality[1])};;USA`] : []),
    // Tells iOS to show this as a company contact rather than a person.
    ...(isOrg ? ['X-ABShowAs:COMPANY'] : []),
    'END:VCARD',
  ];
  return lines.map(foldVCardLine).join('\r\n') + '\r\n';
}
