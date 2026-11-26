import type { APIRoute } from "astro";

// The GitHub Pages staging build sets PUBLIC_STAGING; it also carries a noindex
// meta tag on every page, since crawlers only read robots.txt at a host's root.
const staging = !!import.meta.env.PUBLIC_STAGING;

export const GET: APIRoute = () =>
  new Response(staging ? "User-agent: *\nDisallow: /\n" : "User-agent: *\nAllow: /\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
