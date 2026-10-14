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
  tagline: 'Crafted with Intention.',
  description:
    'Woodfox Coffee is a Houston-based specialty coffee company dedicated to thoughtful sourcing and precision roasting. Crafted with intention.',

  // OWNER TO CONFIRM — the business plan names hello@woodfoxcoffee.com as the intended
  // address. Make sure this inbox exists: contact and wholesale forms deliver to it.
  email: 'hello@woodfoxcoffee.com',
  emailConfirmed: false,

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
 * app with their message addressed to `site.email` (a working delivery
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
