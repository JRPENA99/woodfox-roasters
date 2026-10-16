/**
 * Woodfox Coffee event NFC cards.
 *
 * Three physical cards share one general business profile. Each has its own
 * permanent URL so a card can later be reassigned (for example to a named
 * employee) by giving that entry its own `profile` override, without touching
 * the others or the design.
 *
 * These cards are separate from Tony Luna's personal card (src/data/cards.ts).
 * Never put personal contact details here.
 */
import { buildVCard } from '../lib/vcard';

export type EventProfile = {
  name: string;
  subtitle: string;
  tagline: string;
  org: string;
  /**
   * Business phone in E.164 format (e.g. '+17135551234').
   * TODO: set to the Google Voice business number once confirmed.
   * While null, Call and Text are shown disabled and the vCard has no phone.
   */
  phone: string | null;
  /** Human-readable phone, e.g. '(713) 555-1234'. */
  phoneDisplay: string | null;
  email: string;
  website: string;
  city: string;
  region: string;
  vcfName: string;
};

/** The shared profile used by all event cards. */
export const eventProfile: EventProfile = {
  name: 'Woodfox Coffee',
  subtitle: 'Event Team',
  tagline: 'Great coffee. Real connections.',
  org: 'Woodfox Coffee',
  phone: null, // GOOGLE VOICE BUSINESS NUMBER — TO BE PROVIDED
  phoneDisplay: null,
  email: 'hello@woodfoxcoffee.com',
  website: 'https://woodfoxcoffee.com',
  city: 'Houston',
  region: 'Texas',
  vcfName: 'Woodfox-Coffee.vcf',
};

export type EventCard = {
  /** Two-digit card number; the URL is /card/event-<id>/. Never change once programmed. */
  id: string;
  /** Optional per-card overrides (e.g. if a card is assigned to a person later). */
  profile?: Partial<EventProfile>;
};

export const eventCards: EventCard[] = [{ id: '01' }, { id: '02' }, { id: '03' }];

export const resolveProfile = (card: EventCard): EventProfile => ({ ...eventProfile, ...card.profile });
export const eventCardPath = (card: EventCard) => `/card/event-${card.id}/`;
export const eventVcfPath = (card: EventCard) => `${eventCardPath(card)}${resolveProfile(card).vcfName}`;

export function eventVCard(card: EventCard): string {
  const p = resolveProfile(card);
  return buildVCard({
    name: p.name,
    org: p.org,
    title: p.subtitle,
    phone: p.phone,
    emails: [p.email],
    url: p.website,
    locality: [p.city, 'TX'],
  });
}
