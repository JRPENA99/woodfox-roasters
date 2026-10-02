# Deploying

`npm run build` produces a folder of static files (`dist/`) that any static host can serve.
Nothing has been deployed, and the real domain has not been connected.

## Recommended: Netlify or Cloudflare Pages

Both are free at this scale, rebuild automatically when you push to GitHub, and connect a custom
domain with HTTPS.

1. Put the project in a GitHub repository.
2. In Netlify (or Cloudflare Pages), choose "Import from Git" and pick the repository.
3. Build command: `npm run build` — Output directory: `dist`.
4. Deploy. You'll get a preview URL (e.g. `woodfox.netlify.app`) to review before touching the domain.
5. When you're ready, add `woodfoxroasters.com` as a custom domain and update DNS as instructed.
   This replaces the current site, so do it deliberately.

Vercel works the same way.

## Before going live

- [ ] Replace placeholder photos (`docs/MEDIA.md`)
- [ ] Add the optimized hero video to the project
- [ ] Confirm the email address and location in `src/config/site.ts`
- [ ] Connect the forms (`docs/FORMS.md`)
- [ ] Check `site` in `astro.config.mjs` matches the final domain
- [ ] Add a privacy note if the email list collects addresses in regions that require one
