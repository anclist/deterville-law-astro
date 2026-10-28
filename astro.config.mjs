// @ts-check
import { defineConfig } from 'astro/config';
import basePath from './integrations/base-path.mjs';

// GitHub Pages build sets SITE/BASE (see .github/workflows/deploy.yml); local dev serves from root.
const site = process.env.SITE ?? 'https://detervillelaw.com';
const base = process.env.BASE ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [basePath()],
  redirects: {
    // Legacy GoDaddy URLs
    '/media-&-other-appearances': '/media',
    '/blog/f/[slug]': '/blog/[slug]',
  },
});
