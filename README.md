# ankacloud-website

The landing page for [ankacloud](https://github.com/tao12345666333/ankacloud) — a single-user
"agent-in-sandbox" control plane. Built with Astro as a fully static site and deployed to
**Cloudflare Workers** (static assets, nothing runs per request).

The design follows the product: the same paper-and-ink palette, type scale and brand mark as the
ankacloud Web UI, so the site and the app look like the same thing.

**English is the default language at `/`; Chinese lives under `/zh/`.** Every page has a counterpart
in the other language, the header switcher follows the current page, and `hreflang` alternates are
emitted for search engines.

## Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # build, then serve dist/ through wrangler (the real Worker runtime)
```

## Deploy

```bash
npx wrangler login   # once
npm run deploy       # builds and deploys the Worker named in wrangler.jsonc
```

Or let CI do it: `.github/workflows/deploy.yml` deploys production on every push to `main`;
add the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets first.

Pull requests get a staging build on GitHub Pages (`.github/workflows/staging.yml`); the PR
shows a "View deployment" link. There is one staging slot, so the latest PR push wins. The
staging build sets `PUBLIC_STAGING`, which adds `noindex` to every page and makes
`robots.txt` disallow crawling; production allows it.

Before going live, set the real domain in `astro.config.mjs` (`site`) and in
`src/data/site.ts` (`REPO_URL`, `REPO`, `VERSION`) if the repository or release moves.

## Structure

```
src/
  pages/index.astro        the English landing page (/) and pages/zh/index.astro (/zh/),
                           one component per section
  pages/docs/[...slug].astro, pages/zh/docs/[...slug].astro
                           render the Markdown deep-dive pages
  content/en/*.md, content/zh/*.md
                           architecture / memory / self-hosting, per language
  i18n/ui.ts               every UI string in both languages
  components/              Header, Hero, Features, Architecture, Workflows, …
  layouts/                 Base (head, meta, hreflang, theme bootstrap), Doc
  styles/global.css        design tokens and primitives, mirroring the Web UI
  data/site.ts             every link and version number in one place
public/
  screenshots/             real captures of a running ankacloud (WebP, 2x)
```

## Screenshots

`public/screenshots/*-desktop.webp` are captures of a real ankacloud instance (real LLM, real E2B
sandboxes), 2880×1800, light theme. To refresh them, run the instance, capture at 1440×900 with
`agent-browser set viewport 1440 900 2`, convert to WebP, and keep the file names the components
reference.
