<!--
  Sync Impact Report
  ==================
  Version change: 0.0.0 → 1.0.0 (initial ratification)
  Modified principles: N/A (first version)
  Added sections:
    - Core Principles (6 principles)
    - Technology Stack & Constraints
    - Content & Contribution Workflow
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md — no update needed (generic)
    - .specify/templates/spec-template.md — no update needed (generic)
    - .specify/templates/tasks-template.md — no update needed (generic)
  Follow-up TODOs: None
-->

# LTK Wiki Constitution

## Core Principles

### I. Content-First

All wiki content MUST live as Markdown (.md) or MDX (.mdx) files
within the repository. Content MUST be decoupled from presentation
logic so that contributors can author guides, tooling docs, and
reference material without touching component code. Content schemas
MUST be enforced via Astro Content Collections with Zod validation
to catch structural errors at build time rather than in production.

### II. Static Generation (NON-NEGOTIABLE)

Every page MUST be statically generated at build time. No server-side
rendering or client-side data fetching for core content delivery.
This ensures the wiki is fast, free to host (GitHub Pages, Netlify,
Vercel static), and resilient. Interactive Svelte components MAY
hydrate on the client via Astro's `client:*` directives, but MUST
NOT be required for content consumption. The site MUST produce a
fully functional static HTML output from `astro build`.

### III. Starlight Foundation

The wiki MUST use Astro Starlight as its base theme. Starlight
provides battle-tested documentation infrastructure: sidebar
navigation, search (Pagefind), i18n support, accessible design
tokens, and MDX integration out of the box. Custom styling MUST
be applied via Tailwind CSS utility classes and Starlight's CSS
custom property overrides rather than forking or ejecting the
theme. Custom Svelte components MUST integrate through Starlight's
component override system or as MDX-embedded interactive elements.

**Rationale**: Rolling a custom wiki theme from scratch duplicates
months of UX, accessibility, and search work that Starlight already
solves. Starlight is Astro-native, actively maintained, and
extensible enough for branded customization without lock-in.

### IV. Type Safety

TypeScript strict mode MUST be enabled project-wide. All Astro
components, Svelte components, utility functions, and configuration
files MUST be written in TypeScript. Content collection schemas
MUST use Zod for runtime validation. `any` types are prohibited
except in third-party type declarations where unavoidable. Build
MUST fail on type errors.

### V. Component-Driven Interactive Elements

Interactive UI elements (search filters, code playgrounds, mod
previews, interactive diagrams) MUST be implemented as Svelte
components. Astro components handle page layout and static
rendering. Svelte components MUST declare their hydration strategy
explicitly (`client:load`, `client:visible`, `client:idle`).
Components MUST be self-contained with props-driven interfaces and
MUST NOT rely on global state for core functionality.

### VI. Accessible & Performant

The wiki MUST meet WCAG 2.1 AA compliance. All pages MUST use
semantic HTML elements. Images MUST have alt text. Navigation MUST
be fully keyboard-accessible. Performance targets: Lighthouse
Performance score >= 90, First Contentful Paint < 1.5s, Total
Blocking Time < 200ms on static pages. These metrics MUST be
validated in CI on representative pages.

## Technology Stack & Constraints

- **Framework**: Astro with Starlight theme
- **UI Components**: Svelte 5 for interactive islands
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4+ with Starlight CSS custom properties
- **Content**: Markdown and MDX via Astro Content Collections
- **Search**: Pagefind (bundled with Starlight)
- **Build Output**: Static HTML/CSS/JS only
- **Package Manager**: pnpm (for strict dependency resolution)
- **Node Version**: >= 20 LTS
- **Hosting**: Static deployment (GitHub Pages, Netlify, or Vercel)
- **CI**: GitHub Actions for build validation, type checking, and
  Lighthouse audits

Third-party runtime dependencies MUST be justified. The wiki MUST
NOT require a database, authentication service, or server process
in production. Dev dependencies (linters, formatters, build tools)
have no such restriction.

## Content & Contribution Workflow

Content contributions follow a docs-as-code workflow:

1. Authors create or edit `.md`/`.mdx` files in the content directory
2. Frontmatter MUST conform to the content collection schema
3. Local preview via `pnpm dev` MUST render changes accurately
4. Pull requests trigger CI: build, type check, link validation
5. Merge to main triggers automatic deployment

Content MUST be organized into clearly defined collections (e.g.,
`guides`, `tools`, `reference`) with consistent frontmatter schemas.
Navigation structure MUST be defined declaratively in Starlight's
sidebar configuration, not generated implicitly.

MDX usage guidelines:

- MDX MUST only be used when standard Markdown is insufficient
  (interactive components, conditional rendering, computed content)
- Svelte components imported in MDX MUST be documented in a
  component catalog so authors know what is available
- MDX files MUST NOT contain complex logic; extract to components

## Governance

This constitution defines the architectural and process boundaries
for the LTK Wiki project. All contributions MUST comply with these
principles.

- The constitution supersedes ad-hoc decisions when conflicts arise
- Amendments require: (1) a written proposal in a GitHub issue,
  (2) discussion and approval from maintainers, (3) an updated
  constitution with a migration plan for any breaking changes
- Version follows semantic versioning: MAJOR for principle removals
  or incompatible redefinitions, MINOR for new principles or
  material expansions, PATCH for clarifications and typo fixes
- PRs SHOULD include a constitution compliance note when introducing
  new patterns or deviating from established conventions

**Version**: 1.0.0 | **Ratified**: 2026-03-29 | **Last Amended**: 2026-03-29
