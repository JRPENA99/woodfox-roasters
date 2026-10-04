/**
 * Shop catalogue.
 *
 * EVERYTHING HERE IS PLACEHOLDER until the first coffees are roasted:
 * names, notes, prices and sizes are stand-ins to show how the shop works.
 * Replace each product with real details (and set `placeholder: false`)
 * before checkout is switched on.
 *
 * Prices are in cents. `stripePrice` holds Stripe Price IDs per size, used by
 * the checkout function once Stripe is connected (see docs/COMMERCE.md).
 */

export type Category = 'filter' | 'espresso' | 'sets';

export type Size = {
  id: string;
  label: string;
  price: number;
  stripePrice?: string;
  stripeSubscriptionPrice?: string;
};

export type Product = {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  notes: string[];
  roast: string;
  description: string;
  sizes: Size[];
  grinds: boolean;
  subscribable: boolean;
  /** Placeholder bag colours: background, ink. */
  colors: [string, string];
  placeholder: boolean;
};

export const subscription = {
  discount: 0.15,
  frequencies: [
    { id: '2w', label: 'Every 2 weeks' },
    { id: '4w', label: 'Every 4 weeks' },
    { id: '6w', label: 'Every 6 weeks' },
  ],
};

export const grinds = [
  { id: 'whole', label: 'Whole bean' },
  { id: 'filter', label: 'Ground for filter' },
  { id: 'espresso', label: 'Ground for espresso' },
];

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'filter', label: 'Filter' },
  { id: 'espresso', label: 'Espresso' },
  { id: 'sets', label: 'Sets' },
];

const standard = (base: number): Size[] => [
  { id: '12oz', label: '12 oz', price: base },
  { id: '2lb', label: '2 lb', price: Math.round((base * 2.35) / 100) * 100 },
];

export const products: Product[] = [
  {
    id: 'seasonal-filter',
    name: 'Seasonal Filter',
    category: 'filter',
    tagline: 'A bright, clear coffee for pour-over and batch brew.',
    notes: ['Stone fruit', 'Honey', 'Black tea'],
    roast: 'Light',
    description:
      'Our rotating filter coffee, chosen each season for clarity and sweetness. Roasted light to keep its origin character front and centre.',
    sizes: standard(2200),
    grinds: true,
    subscribable: true,
    colors: ['#e9dfcf', '#2f221a'],
    placeholder: true,
  },
  {
    id: 'seasonal-espresso',
    name: 'Seasonal Espresso',
    category: 'espresso',
    tagline: 'Sweet and balanced, on its own or with milk.',
    notes: ['Milk chocolate', 'Red apple', 'Caramel'],
    roast: 'Medium-light',
    description:
      'A seasonal espresso developed to be sweet and forgiving across a range of recipes, while still tasting of where it’s from.',
    sizes: standard(2200),
    grinds: true,
    subscribable: true,
    colors: ['#3d2d22', '#f3eee5'],
    placeholder: true,
  },
  {
    id: 'single-origin-01',
    name: 'Single Origin 01',
    category: 'filter',
    tagline: 'A limited release from a single farm or cooperative.',
    notes: ['Florals', 'Citrus', 'Cane sugar'],
    roast: 'Light',
    description:
      'Small, seasonal releases chosen for something distinctive in the cup. Each one is listed with everything we know about where it came from.',
    sizes: [{ id: '8oz', label: '8 oz', price: 2400 }],
    grinds: true,
    subscribable: false,
    colors: ['#9b1f2a', '#f3eee5'],
    placeholder: true,
  },
  {
    id: 'house-decaf',
    name: 'Decaf',
    category: 'espresso',
    tagline: 'All of the flavour, none of the caffeine.',
    notes: ['Cocoa', 'Dried fig', 'Brown sugar'],
    roast: 'Medium',
    description:
      'A full-flavoured decaf that works for espresso and filter alike, for evenings and slower mornings.',
    sizes: standard(2100),
    grinds: true,
    subscribable: true,
    colors: ['#55614a', '#f3eee5'],
    placeholder: true,
  },
  {
    id: 'tasting-set',
    name: 'Tasting Set',
    category: 'sets',
    tagline: 'Three small bags to compare side by side.',
    notes: ['Three coffees', 'Brew guide included'],
    roast: 'Mixed',
    description:
      'Three 4 oz bags from the current lineup, chosen to show how origin, process and roast change what ends up in the cup.',
    sizes: [{ id: 'set', label: '3 × 4 oz', price: 2800 }],
    grinds: true,
    subscribable: false,
    colors: ['#a5563b', '#f3eee5'],
    placeholder: true,
  },
  {
    id: 'gift-card',
    name: 'Gift Card',
    category: 'sets',
    tagline: 'Let someone choose their own coffee.',
    notes: ['Delivered by email'],
    roast: '—',
    description: 'A digital gift card, delivered by email and redeemable on any coffee in the shop.',
    sizes: [
      { id: '25', label: '$25', price: 2500 },
      { id: '50', label: '$50', price: 5000 },
      { id: '100', label: '$100', price: 10000 },
    ],
    grinds: false,
    subscribable: false,
    colors: ['#f8f5ef', '#9b1f2a'],
    placeholder: true,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const money = (cents: number, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: cents % 100 ? 2 : 0 }).format(
    cents / 100,
  );

export const fromPrice = (p: Product) => Math.min(...p.sizes.map((s) => s.price));
