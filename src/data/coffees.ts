import { getCollection, type CollectionEntry } from 'astro:content';

export type Coffee = CollectionEntry<'coffees'>;

/** Published coffees, in display order. */
export async function getCoffees(): Promise<Coffee[]> {
  const all = await getCollection('coffees', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order || a.data.name.localeCompare(b.data.name));
}

/** Detail rows shown on cards and coffee pages, skipping anything unknown. */
export function coffeeFacts(c: Coffee['data']) {
  return [
    ['Country', c.country],
    ['Region', c.region],
    ['Producer', c.producer],
    ['Process', c.process],
    ['Variety', c.variety],
    ['Altitude', c.altitude],
    ['Harvest', c.harvest],
  ].filter((row): row is [string, string] => Boolean(row[1]));
}

export const statusLabel = {
  upcoming: 'Coming soon',
  available: 'Available',
  'sold-out': 'Sold out',
} as const;
