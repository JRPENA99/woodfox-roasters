// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Update to the real production URL before deploying (used for canonical URLs).
  site: 'https://woodfoxroasters.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Keeps Vite from resolving symlinked/redirected folders to a different path,
  // which silently drops CSS from the build. Harmless everywhere else.
  vite: { resolve: { preserveSymlinks: true } },
});
