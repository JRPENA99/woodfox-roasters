/**
 * Coffee catalogue — the single source for the Our Coffee page, product
 * pages and (later) checkout.
 *
 * CURRENT ENTRIES ARE DEVELOPMENT PLACEHOLDERS. They exist to show the layout
 * and are labelled on the site so they can't be mistaken for real inventory.
 * Replace them with real coffees when the first roasts are ready:
 *
 *  - set `status` to 'available' (or 'upcoming' / 'sold-out')
 *  - fill in origin, region, roast, notes, description and image
 *  - give each size a `price` (in cents: 2000 = $20) and `available: true`
 *  - add Stripe/Square/Shopify IDs when checkout is connected (docs/COMMERCE.md)
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
  /** Path under /public, e.g. /media/images/coffees/ethiopia.jpg */
  image?: string;
  imageAlt?: string;
  subscribable: boolean;
  /** Placeholder bag colours while there's no photo: [background, ink]. */
  colors: [string, string];
};

const planSizes = (): Size[] => [
  { id: '12oz', label: '12 oz', available: false },
  { id: '2lb', label: '2 lb', available: false },
  { id: '5lb', label: '5 lb', available: false },
];

export const products: Product[] = [
  {
    id: 'coffee-01',
    name: 'Coffee 01',
    status: 'placeholder',
    roast: 'Light',
    notes: [],
    description:
      'Development placeholder. This space will describe a real Woodfox coffee: where it was grown, how it was processed, and how we roast it.',
    sizes: planSizes(),
    subscribable: true,
    colors: ['#f5f4ef', '#2c3e28'],
  },
  {
    id: 'coffee-02',
    name: 'Coffee 02',
    status: 'placeholder',
    roast: 'Light-medium',
    notes: [],
    description:
      'Development placeholder. This space will describe a real Woodfox coffee: where it was grown, how it was processed, and how we roast it.',
    sizes: planSizes(),
    subscribable: true,
    colors: ['#2c3e28', '#f5f4ef'],
  },
  {
    id: 'coffee-03',
    name: 'Coffee 03',
    status: 'placeholder',
    roast: 'Medium',
    notes: [],
    description:
      'Development placeholder. This space will describe a real Woodfox coffee: where it was grown, how it was processed, and how we roast it.',
    sizes: planSizes(),
    subscribable: true,
    colors: ['#c84b31', '#f5f4ef'],
  },
];

export const statusLabel: Record<Status, string> = {
  placeholder: 'Development placeholder',
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
