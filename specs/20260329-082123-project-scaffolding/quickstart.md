# Quickstart: Project Scaffolding

**Branch**: `20260329-082123-project-scaffolding`
**Date**: 2026-03-29

## Prerequisites

- Node.js >= 20 LTS
- pnpm (install via `corepack enable && corepack prepare pnpm@latest --activate`)
- Git

## Setup

```bash
# Clone and enter project
git clone <repo-url>
cd ltk-wiki

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The wiki will be available at `http://localhost:4321`.

## Key Commands

| Command            | Purpose                          |
| ------------------ | -------------------------------- |
| `pnpm dev`         | Start dev server with hot reload |
| `pnpm build`       | Build static site for production |
| `pnpm preview`     | Preview production build locally |
| `pnpm astro check` | Run TypeScript type checking     |
| `pnpm lint`        | Run ESLint on all source files   |
| `pnpm format`      | Format code with Prettier        |

## Adding a New Page

1. Create a `.md` file in the appropriate `src/content/docs/` subdirectory
2. Add required frontmatter:

   ```markdown
   ---
   title: Your Page Title
   description: Brief description for search and SEO
   ---

   Your content here...
   ```

3. Add the page to the sidebar configuration in `astro.config.ts` if needed
4. The dev server auto-refreshes to show the new page

## Adding an Interactive Component

1. Create a `.svelte` file in `src/components/`
2. Create or convert the target page to `.mdx`
3. Import and use the component with a hydration directive:

   ```mdx
   ---
   title: Page with Interactive Component
   ---

   import MyComponent from '../../components/MyComponent.svelte';

   # Page Title

   <MyComponent client:visible />
   ```

## Project Layout

- `src/content/docs/` — All documentation content (Markdown/MDX)
- `src/components/` — Svelte interactive components
- `src/styles/` — Custom CSS overrides
- `astro.config.ts` — Astro, Starlight, and sidebar configuration
- `public/` — Static assets served as-is (favicon, robots.txt)
