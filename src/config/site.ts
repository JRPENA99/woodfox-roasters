/**
 * Site-wide settings for Woodfox Coffee.
 *
 * Most "one place to change it" details live here: navigation, contact
 * details, form endpoints and the hero video. Values marked PLACEHOLDER
 * should be confirmed before launch.
 */

export const site = {
  name: 'Woodfox Coffee',
  shortName: 'Woodfox',
  description:
    'Woodfox Coffee is a young specialty coffee roasting company. Thoughtfully selected coffee, roasted with intention.',

  // PLACEHOLDER — confirm the real inbox before launch.
  email: 'hello@woodfoxroasters.com',

  // Taken from the current woodfoxroasters.com site. Set to '' to hide.
  location: 'Houston, Texas',

  // Add real profiles when they exist, e.g. { label: 'Instagram', href: 'https://instagram.com/…' }
  social: [] as { label: string; href: string }[],
};

export const nav = [
  { label: 'Coffee', href: '/coffee/' },
  { label: 'Sourcing', href: '/sourcing/' },
  { label: 'About', href: '/about/' },
  { label: 'Wholesale', href: '/wholesale/' },
  { label: 'Contact', href: '/contact/' },
];

export const cta = { label: 'Join the List', href: '/#list' };

/**
 * Form endpoints. Leave empty while the site is a prototype: forms will
 * validate and show a "not connected yet" note instead of sending anything.
 *
 * Any service that accepts a standard HTML form POST works, for example
 * Formspree, Basin, Netlify Forms, or a Kit / Buttondown / Mailchimp
 * embed URL for the email list. See docs/FORMS.md.
 */
export const forms = {
  newsletter: '',
  contact: '',
  wholesale: '',
};

/** Homepage hero video: Woodfox's own harvest film, re-encoded to 1080p (~8 MB). */
export const heroVideo = {
  src: '/media/video/hero-harvest-1080.mp4',
  type: 'video/mp4',
};
