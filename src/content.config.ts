import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Coffees. Each coffee is one Markdown file in src/content/coffees/.
 * The file name becomes the page address: ethiopia-guji.md -> /coffee/ethiopia-guji/
 *
 * Only `name`, `country` and `status` are required, so a coffee can be
 * published before every detail is known. Unknown fields are simply hidden.
 * See src/content/coffees/_TEMPLATE.md.
 */
const coffees = defineCollection({
  // Files starting with an underscore are ignored (used for the template).
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/coffees' }),
  schema: z.object({
    name: z.string(),
    country: z.string(),
    region: z.string().optional(),
    producer: z.string().optional(),
    process: z.string().optional(),
    variety: z.string().optional(),
    altitude: z.string().optional(),
    harvest: z.string().optional(),
    notes: z.array(z.string()).default([]),
    roast: z.string().optional(),
    /** Short line shown on cards. */
    summary: z.string().optional(),
    /** Path in /public, e.g. /media/images/coffees/guji.jpg */
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    /** upcoming: shown as "coming soon". available: shows a Buy button if buyUrl is set. */
    status: z.enum(['upcoming', 'available', 'sold-out']).default('upcoming'),
    size: z.string().optional(),
    price: z.string().optional(),
    /** Stripe Payment Link or Shopify checkout/product URL. */
    buyUrl: z.url().optional(),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { coffees };
