/**
 * Site-wide settings for Woodfox Coffee.
 *
 * One place to change company details, navigation, form delivery, the hero
 * video and whether online ordering is switched on. Values marked
 * OWNER TO CONFIRM must be checked before they are relied on.
 */

export const site = {
  /** Consumer-facing brand. */
  name: 'Woodfox Coffee',
  /** Registered business name (business plan, §2). */
  legalName: 'Woodfox Coffee Company',
  shortName: 'Woodfox',
  url: 'https://woodfoxcoffee.com',
  tagline: 'Coffee you can actually taste.',
  description:
    'Woodfox Coffee is a small-batch specialty coffee roaster in Houston, Texas. Light-to-medium roasts, first bags coming soon.',

  /** General and public contact. */
  email: 'hello@woodfoxcoffee.com',
  /** Orders, shipping and wholesale. */
  ordersEmail: 'orders@woodfoxcoffee.com',
  emailHref: 'mailto:hello@woodfoxcoffee.com',
  ordersHref: 'mailto:orders@woodfoxcoffee.com',
  emailConfirmed: true,
  phone: '713-742-2709',
  phoneHref: 'tel:+17137422709',
  phoneE164: '+17137422709',

  city: 'Houston',
  region: 'Texas',
  location: 'Houston, Texas',

  // Add real profiles once confirmed, e.g. { label: 'Instagram', href: 'https://instagram.com/…' }
  social: [] as { label: string; href: string }[],
};

/** Main navigation. "Home" is the logo (and appears in the mobile menu). */
export const nav = [
  { label: 'Our Coffee', href: '/coffee/' },
  { label: 'Sourcing & Roasting', short: 'Sourcing', href: '/sourcing/' },
  { label: 'Our Story', href: '/about/' },
  { label: 'Wholesale', href: '/wholesale/' },
  { label: 'Contact', href: '/contact/' },
];

export const legal = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms & Conditions', href: '/terms/' },
  { label: 'Shipping Policy', href: '/shipping/' },
  { label: 'Returns & Refunds', href: '/returns/' },
];

/**
 * Form delivery.
 *
 * With no endpoint set, contact and wholesale forms open the visitor's email
 * app with their message addressed by category: general and collaboration
 * messages to `site.email`, wholesale and order/shipping messages to
 * `site.ordersEmail` (a working delivery
 * method that needs no third-party service). To receive submissions directly,
 * paste a form-service URL here (Formspree, Basin, etc.). See docs/FORMS.md.
 */
export const forms = {
  contact: '',
  wholesale: '',
};

/** Homepage hero video: Woodfox's own harvest film, re-encoded to 1080p (~8 MB). */
export const heroVideo = {
  src: '/media/video/hero-harvest-1080.mp4',
  type: 'video/mp4',
};

/**
 * Online ordering. OFF until a payment provider is configured and approved.
 *
 * While `enabled` is false the site shows coffees without prices, carts or
 * checkout, and never suggests that orders are being accepted.
 * See docs/COMMERCE.md for switching it on (Stripe, Square or Shopify).
 */
export const commerce = {
  enabled: false,
  provider: 'none' as 'none' | 'endpoint',
  endpoint: '',
  currency: 'USD',
};
