/**
 * Coffee catalogue — the single source for the Our Coffee page, product
 * pages and (later) checkout.
 *
 * CURRENT ENTRIES ARE PACKAGING CONCEPTS IN DEVELOPMENT, not finished products.
 * Names come from the concept bags; tasting notes, weights and other text
 * printed on the mockups are NOT confirmed specifications, so they are not
 * repeated here. When a coffee is final:
 *
 *  - set `status` to 'available' (or 'upcoming' / 'sold-out')
 *  - fill in origin, region, species, process, roast, notes and description
 *  - give each size a `price` (in cents: 2000 = $20) and `available: true`
 *  - add payment-provider price IDs when checkout is connected (docs/COMMERCE.md)
 *
 * Sizes follow the business plan's packaging (12 oz, 2 lb, 5 lb); none is
 * marked available until confirmed.
 */

export type Size = {
  id: string;
  label: string;
  /** Price in cents. Leave undefined until confirmed. */
  price?: number;
  available: boolean;
  /** Payment-provider price IDs, used once checkout is enabled. */
  providerPrice?: string;
  providerSubscriptionPrice?: string;
};

export type Status = 'placeholder' | 'upcoming' | 'available' | 'sold-out';

export type Product = {
  id: string;
  name: string;
  status: Status;
  origin?: string;
  region?: string;
  species?: string;
  process?: string;
  roast: 'Light' | 'Light-medium' | 'Medium' | 'To be announced';
  notes: string[];
  description: string;
  sizes: Size[];
  /**
   * Packaging image. `base` is the path without size/extension; the site expects
   * `<base>-560.webp`, `<base>-1120.webp` and `<base>.png` (transparent background).
   */
  image?: { base: string; alt: string; width: number; height: number };
  /** Soft backdrop behind the bag. */
  backdrop: string;
  subscribable: boolean;
  /** Placeholder bag colours while there's no photo: [background, ink]. */
  colors: [string, string];
};

const planSizes = (): Size[] => [
  { id: '12oz', label: '12 oz', available: false },
  { id: '2lb', label: '2 lb', available: false },
  { id: '5lb', label: '5 lb', available: false },
];

const pkg = (slug: string, alt: string) => ({
  base: `/media/images/products/${slug}`,
  alt,
  width: 1122,
  height: 1402,
});

const conceptDescription =
  'This is the bag. The coffee inside is still being picked out and dialed in. Once we’re happy with it, this page will tell you where it grew, how we roast it and what it tastes like.';

/** Order matters: the first product is featured on the homepage. */
export const products: Product[] = [
  {
    id: 'coffee-01',
    name: 'Single Origin',
    status: 'placeholder',
    roast: 'To be announced',
    notes: [],
    description: conceptDescription,
    sizes: planSizes(),
    image: pkg('single-origin', 'Woodfox Coffee Single Origin packaging concept: a forest-green bag with a copper fox and mountain landscape'),
    backdrop: '#e6e0d1',
    subscribable: true,
    colors: ['#2c3e28', '#f4f0e7'],
  },
  {
    id: 'coffee-02',
    name: 'House Blend No. 01',
    status: 'placeholder',
    roast: 'To be announced',
    notes: [],
    description: conceptDescription,
    sizes: planSizes(),
    image: pkg('house-blend-01', 'Woodfox Coffee House Blend No. 01 packaging concept: a cream bag with an engraved forest and lake scene'),
    backdrop: '#dfe3d6',
    subscribable: true,
    colors: ['#f4f0e7', '#2c3e28'],
  },
  {
    id: 'coffee-03',
    name: 'Espresso Blend',
    status: 'placeholder',
    roast: 'To be announced',
    notes: [],
    description: conceptDescription,
    sizes: planSizes(),
    image: pkg('espresso-blend', 'Woodfox Coffee Espresso Blend packaging concept: a black bag with a copper fox and snow-capped mountains'),
    backdrop: '#ebe4d6',
    subscribable: true,
    colors: ['#1b1b1b', '#f4f0e7'],
  },
];

export const statusLabel: Record<Status, string> = {
  placeholder: 'In development',
  upcoming: 'Coming soon',
  available: 'Available',
  'sold-out': 'Sold out',
};

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const money = (cents: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: cents % 100 ? 2 : 0 }).format(
    cents / 100,
  );

/** Lowest confirmed price, or null when no price is set. */
export const fromPrice = (p: Product) => {
  const prices = p.sizes.filter((s) => s.available && s.price != null).map((s) => s.price!);
  return prices.length ? Math.min(...prices) : null;
};

/** Subscription settings, used once ordering is enabled. Discount needs owner approval. */
export const subscription = {
  discount: 0,
  frequencies: [
    { id: '2w', label: 'Every 2 weeks' },
    { id: '4w', label: 'Every 4 weeks' },
  ],
};

export const grinds = [
  { id: 'whole', label: 'Whole bean' },
  { id: 'filter', label: 'Ground for filter' },
  { id: 'espresso', label: 'Ground for espresso' },
];
