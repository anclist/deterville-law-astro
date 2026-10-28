import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Immigration', 'Wills & Estates']),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    source: z.url().optional(),
  }),
});

export const collections = { blog };
