// @ts-check
import { defineConfig } from 'astro/config';

// The site is fully static; `wrangler deploy` serves the build output as a
// Cloudflare Worker with static assets (see wrangler.jsonc).
// https://astro.build/config
export default defineConfig({
  site: 'https://ankacloud.moelove.info',
  // English is the default language at /, Chinese lives under /zh/. The domain
  // is provisional; emitting a sitemap from a wrong site URL would point search
  // engines at the wrong place, so turn it on once the domain is set.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: { prefixDefaultLocale: false },
  },
});
