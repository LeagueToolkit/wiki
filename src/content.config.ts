import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { AUDIENCES, STATUSES, SUBJECTS, TYPES } from './lib/tags';

// Cardinality is part of the contract, not a style note: past three subjects the
// chip row wraps and stops reading as a summary. Vocabulary lives in lib/tags.ts.
const tags = z.object({
  type: z.enum(TYPES),
  audience: z.array(z.enum(AUDIENCES)).min(1).max(3),
  subject: z.array(z.enum(SUBJECTS)).min(1).max(3),
  status: z.enum(STATUSES).optional(),
});

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({ extend: z.object({ tags: tags.optional() }) }),
  }),
};
