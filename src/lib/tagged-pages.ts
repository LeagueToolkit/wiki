import { getCollection } from 'astro:content';
import type { PageTags, TagSlug } from './tags';

export interface TaggedPage {
  href: string;
  title: string;
  description?: string;
  tags: PageTags;
}

/** Every page carrying tags, alphabetical by title. */
export async function getTaggedPages(): Promise<TaggedPage[]> {
  const docs = await getCollection('docs');
  return docs
    .filter((entry) => entry.data.tags)
    .map((entry) => ({
      href: `/${entry.id}/`.replace(/\/{2,}/g, '/'),
      title: entry.data.title,
      description: entry.data.description,
      tags: entry.data.tags as PageTags,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

/** Reverse index. Tags nobody uses are absent rather than mapped to an empty list. */
export async function getPagesByTag(): Promise<Map<TagSlug, TaggedPage[]>> {
  const index = new Map<TagSlug, TaggedPage[]>();
  for (const page of await getTaggedPages()) {
    const { type, audience, subject, status } = page.tags;
    for (const slug of [type, ...audience, ...subject, ...(status ? [status] : [])]) {
      const bucket = index.get(slug);
      if (bucket) bucket.push(page);
      else index.set(slug, [page]);
    }
  }
  return index;
}
