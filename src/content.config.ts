import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// The deep-dive pages are Markdown so they read like the project's own docs.
// English is the default language; Chinese lives under /zh/ and links to the
// other language's pages, so every entry exists in both collections.
const schema = z.object({
  title: z.string(),
  description: z.string(),
  eyebrow: z.string(),
});

const en = defineCollection({
  loader: glob({ base: "./src/content/en", pattern: "**/*.{md,mdx}" }),
  schema,
});

const zh = defineCollection({
  loader: glob({ base: "./src/content/zh", pattern: "**/*.{md,mdx}" }),
  schema,
});

export const collections = { en, zh };
