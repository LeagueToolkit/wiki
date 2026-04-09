# Data Model: Project Scaffolding

**Branch**: `20260329-082123-project-scaffolding`
**Date**: 2026-03-29

## Entities

### Documentation Page

A single content file (.md or .mdx) within the `docs` content collection.

**Attributes**:

- `title` (string, required) — Page title displayed in browser tab and sidebar
- `description` (string, optional) — Meta description for SEO and search result snippets
- `sidebar` (object, optional) — Sidebar display configuration (label override, order, badge, hidden flag)
- `tableOfContents` (object, optional) — Table of contents configuration (min/max heading depth)
- `editUrl` (string|boolean, optional) — Link to edit this page on GitHub
- `hero` (object, optional) — Hero section for landing pages (title, tagline, image, actions)
- `head` (array, optional) — Additional `<head>` elements for the page

**Validation**: Zod schema via Starlight's `docsSchema()`. Build fails on invalid frontmatter.

**States**: Draft → Published (controlled by `draft: true/false` frontmatter field, supported by Starlight)

### Content Section

A directory within `src/content/docs/` that groups related documentation pages.

**Attributes**:

- Directory path (determines URL structure)
- Sidebar group configuration (label, collapsed state, sort order)

**Relationships**: Contains one or more Documentation Pages. May contain nested Content Sections (e.g., `guides/mod-management/`).

**Defined Sections**:

- `getting-started/` — Linear onboarding flow (3 pages)
- `guides/` — Task-oriented articles with sub-sections: `mod-management/` (4 pages), `mod-creation/` (4 pages), `contributing/` (2 pages)
- `tools/` — Per-tool documentation: `ltk-manager/` (3 pages), `league-toolkit/` (2 pages)
- `reference/` — Technical specs: `file-formats/` (8 pages), `metaclasses/` (1 page), `hashing/` (1 page)
- `community/` — External resources (2 pages)

### Interactive Island

A Svelte component embedded in an MDX page via import and hydration directive.

**Attributes**:

- Component file path (e.g., `src/components/MetaclassBrowser.svelte`)
- Hydration strategy (`client:load`, `client:visible`, `client:idle`)
- Props interface (TypeScript-typed, component-specific)

**Relationships**: Imported by Documentation Pages (MDX only). Self-contained — no global state dependencies.

**Note**: No interactive components are created during scaffolding. This entity documents the architecture for future use.

## Relationships

```
Content Section (directory)
  └── contains → Documentation Page (.md/.mdx)
                    └── may embed → Interactive Island (Svelte component)
```

## Data Flow

1. Author creates/edits `.md`/`.mdx` file in `src/content/docs/`
2. Astro Content Collections validates frontmatter against Zod schema at build time
3. Starlight renders page with documentation shell (sidebar, search, theme)
4. Pagefind indexes rendered HTML for client-side search
5. Static HTML/CSS/JS output deployed to GitHub Pages
