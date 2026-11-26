import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { path, type Lang } from "../i18n/ui";

// Every page exists in both languages, so each URL lists itself and its
// translation as hreflang alternates. The 404 page is left out on purpose.
export const GET: APIRoute = async ({ site }) => {
  const docs = (await getCollection("en")).map((entry) => `docs/${entry.id}`);
  const pages = ["", ...docs];
  const langs: Record<Lang, string> = { en: "en", zh: "zh-CN" };
  const abs = (lang: Lang, p: string) => new URL(path(lang, p), site).href;

  const urls = pages.flatMap((p) =>
    (Object.keys(langs) as Lang[]).map((lang) => {
      const alternates = (Object.keys(langs) as Lang[])
        .map((alt) => `    <xhtml:link rel="alternate" hreflang="${langs[alt]}" href="${abs(alt, p)}"/>`)
        .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${abs("en", p)}"/>`)
        .join("\n");
      return `  <url>\n    <loc>${abs(lang, p)}</loc>\n${alternates}\n  </url>`;
    }),
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
