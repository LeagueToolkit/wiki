# Research: Project Scaffolding

**Branch**: `20260329-082123-project-scaffolding`
**Date**: 2026-03-29

## R1: Astro Starlight Project Initialization

**Decision**: Use `create astro` with Starlight template, then layer Svelte and Tailwind integrations.

**Rationale**: Starlight provides the official starter template that includes correct Astro configuration, content collection setup, and default theme. Adding integrations on top is the documented approach and avoids manual wiring.

**Alternatives considered**:

- Manual Astro setup without Starlight template — rejected because it requires recreating sidebar, search, and theme infrastructure that Starlight bundles
- Cloning an existing Starlight site — rejected because it brings opinionated content we'd need to strip out

## R2: Svelte 5 Integration with Astro

**Decision**: Use `@astrojs/svelte` official integration. Svelte 5 is the current release and fully supported.

**Rationale**: The official Astro Svelte integration handles Vite plugin configuration, SSR rendering, and client hydration directives automatically. Svelte 5 introduces runes and a new reactivity model that is production-ready.

**Alternatives considered**:

- React islands — rejected per constitution (Principle V mandates Svelte)
- Svelte 4 — rejected as Svelte 5 is the current stable version with better performance

## R3: Tailwind CSS v4 Integration

**Decision**: Use `@astrojs/tailwind` integration with Tailwind CSS v4. Layer Tailwind utilities on top of Starlight's CSS custom properties.

**Rationale**: Tailwind v4 uses a CSS-first configuration approach with `@theme` directives, eliminating the need for a separate JavaScript config file in most cases. The Astro integration handles PostCSS setup. Starlight's design tokens remain accessible via CSS custom properties.

**Alternatives considered**:

- Tailwind v3 — rejected as v4 is current and offers simpler configuration
- Pure CSS with Starlight tokens only — rejected because Tailwind utilities accelerate custom component styling significantly

## R4: Content Collection Schema Design

**Decision**: Use Starlight's built-in `docsSchema()` from `@astrojs/starlight/schema` as the base schema. Extend with custom Zod fields only if needed later.

**Rationale**: Starlight's schema includes all standard documentation fields (title, description, sidebar config, table of contents, edit URL, hero, etc.). Custom extensions can be added incrementally without breaking existing content.

**Alternatives considered**:

- Fully custom Zod schema — rejected because it would lose Starlight's built-in features (sidebar labels, badges, pagination control)
- No schema validation — rejected per constitution (Principle I mandates Zod validation)

## R5: Sidebar Navigation Configuration

**Decision**: Define sidebar declaratively in `astro.config.ts` using Starlight's `sidebar` option with nested groups matching the content hierarchy.

**Rationale**: Declarative sidebar configuration gives full control over ordering, grouping, and labels. It matches the constitution requirement for explicit navigation structure (not auto-generated).

**Alternatives considered**:

- Auto-generated sidebar from file structure — rejected per constitution (Content & Contribution Workflow requires declarative sidebar definition)
- Separate sidebar config file — rejected as Starlight expects it in `astro.config.ts`

## R6: Linting and Formatting Tooling

**Decision**: ESLint with TypeScript and Astro plugins for linting. Prettier with Astro and Svelte plugins for formatting.

**Rationale**: ESLint + Prettier is the standard toolchain for TypeScript/Astro projects. The Astro and Svelte plugins ensure `.astro` and `.svelte` files are properly handled.

**Alternatives considered**:

- Biome — viable but lacks mature Astro/Svelte plugin support
- ESLint only (with formatting rules) — rejected because Prettier handles formatting more consistently

## R7: CI/CD Pipeline Design

**Decision**: GitHub Actions workflow with: (1) pnpm install, (2) astro check, (3) astro build, (4) Lighthouse CI on build output, (5) deploy to GitHub Pages via `actions/deploy-pages`.

**Rationale**: This matches the build pipeline defined in DESIGN.md. GitHub Actions is the CI platform specified in the constitution. The workflow runs on push to main and on PRs for validation.

**Alternatives considered**:

- Netlify/Vercel CI — rejected because GitHub Pages is the specified hosting target and GitHub Actions is the specified CI
- Skip Lighthouse in CI — rejected per constitution (Principle VI requires CI-validated performance metrics)

## R8: Placeholder Content Strategy

**Decision**: Create minimal placeholder pages for every path defined in DESIGN.md's information architecture. Each page has valid frontmatter (title, description) and a brief description of what the page will contain.

**Rationale**: Placeholder content validates the entire content pipeline (schema validation, sidebar navigation, search indexing, build) without requiring actual documentation content. It makes the wiki immediately navigable and demonstrates the structure.

**Alternatives considered**:

- Single index page only — rejected because it doesn't validate the navigation structure or content collection routing
- Full content authoring — out of scope for scaffolding
