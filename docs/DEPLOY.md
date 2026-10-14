# Deployment and domains

## How the site deploys

- Hosting: **GitHub Pages**, repository `JRPENA99/woodfox-roasters`, branch `main`.
- Every push to `main` runs `.github/workflows/deploy.yml`, which builds the Astro site and publishes it
  (Settings → Pages → Source must stay on **GitHub Actions**).
- The previous static site is preserved on the `legacy-site` branch.

## Primary domain: woodfoxcoffee.com

DNS for woodfoxcoffee.com (GoDaddy) already points at GitHub Pages (checked October 14, 2026):

| Record | Value |
| --- | --- |
| A `@` | 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 |
| CNAME `www` | jrpena99.github.io |

**Manual step in GitHub:** with Actions-based Pages, the custom domain is set in the repository
settings, not by the `public/CNAME` file. Go to **Settings → Pages → Custom domain**, enter
`woodfoxcoffee.com`, save, wait for the DNS check and certificate, then tick **Enforce HTTPS**.
(The `public/CNAME` file is kept for consistency.)

## Secondary domains (GoDaddy)

| Domain | Status on Oct 14, 2026 | Recommended |
| --- | --- | --- |
| woodfoxcoffeeco.com | Points to GoDaddy (parked page) | GoDaddy → Domain → Forwarding → permanent (301) to `https://woodfoxcoffee.com` |
| woodfoxcoffeecompany.com | Points to GoDaddy, redirects to itself | Same forwarding to `https://woodfoxcoffee.com` |
| woodfoxroasters.com | Points to GitHub Pages (old site) | Once woodfoxcoffee.com is the Pages domain, forward this in GoDaddy too, or it will show a GitHub 404 |

Don't add these domains to GitHub Pages; Pages serves one custom domain per site. Don't use
GoDaddy's website builder for any of them.

## Updating the site

```bash
npm run build      # check it builds
git add -A
git commit -m "Describe the change"
git push           # deploys in ~1–2 minutes
```
