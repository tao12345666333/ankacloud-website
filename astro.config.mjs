// @ts-check
import { defineConfig } from 'astro/config';

// The site is fully static; `wrangler deploy` serves the build output as a
// Cloudflare Worker with static assets (see wrangler.jsonc).
// https://astro.build/config
export default defineConfig({
  // Where the site is served from. The GitHub Pages workflow sets
  // PUBLIC_SITE_URL to the staging URL (https://<owner>.github.io/<repo>/);
  // a Cloudflare Workers build without it uses the production domain.
  site: process.env.PUBLIC_SITE_URL ?? 'https://ankacloud.moelove.info',
  // GitHub Pages serves the site under /<repo>/; Cloudflare Workers serves it
  // at the root.
  base: process.env.PUBLIC_SITE_BASE ?? '/',
  // English is the default language at /, Chinese lives under /zh/. The domain
  // is provisional; emitting a sitemap from a wrong site URL would point search
  // engines at the wrong place, so turn it on once the domain is set.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: { prefixDefaultLocale: false },
  },
});
