import type { APIRoute } from 'astro';
import { nav, legal } from '../config/site';
import { products } from '../data/products';

/** Plain sitemap, no extra dependency. Placeholder coffees are left out. */
export const GET: APIRoute = ({ site }) => {
  const paths = [
    '/',
    ...nav.map((n) => n.href),
    ...legal.map((l) => l.href),
    ...products.filter((p) => p.status !== 'placeholder').map((p) => `/coffee/${p.id}/`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
