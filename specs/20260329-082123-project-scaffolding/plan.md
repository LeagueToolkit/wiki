# Implementation Plan: Project Scaffolding

**Branch**: `20260329-082123-project-scaffolding` | **Date**: 2026-03-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/20260329-082123-project-scaffolding/spec.md`

## Summary

Set up the complete Astro Starlight project from scratch: initialize the package with all required dependencies (Astro, Starlight, Svelte 5, TypeScript, Tailwind CSS v4), configure content collections with Zod-validated frontmatter schemas, create the full content directory structure with placeholder pages for all five top-level sections, configure declarative sidebar navigation, set up linting/formatting tooling, and add a GitHub Actions CI/CD pipeline for build validation and deployment to GitHub Pages.

## Technical Context

**Language/Version**: TypeScript (strict mode) on Node >= 20 LTS
**Primary Dependencies**: Astro, @astrojs/starlight, Svelte 5 (@astrojs/svelte), Tailwind CSS v4 (@astrojs/tailwind), Pagefind (bundled with Starlight)
**Storage**: N/A (static site, no database)
**Testing**: `astro check` for type validation, Lighthouse CI for performance audits, ESLint + Prettier for code quality
**Target Platform**: Static HTML/CSS/JS deployed to GitHub Pages
**Project Type**: Static documentation site (Astro Starlight)
**Performance Goals**: Lighthouse Performance >= 90, FCP < 1.5s, TBT < 200ms, LCP < 2.5s
**Constraints**: No server-side runtime, no client-side data fetching for core content, purely static output
**Scale/Scope**: ~30 initial placeholder pages across 5 content sections, growing over time

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

| Principle                                | Status | Notes                                                                              |
| ---------------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| I. Content-First                         | PASS   | All content as .md/.mdx in content collections with Zod validation                 |
| II. Static Generation (NON-NEGOTIABLE)   | PASS   | `astro build` produces static HTML/CSS/JS only; no SSR                             |
| III. Starlight Foundation                | PASS   | Starlight is the base theme; Tailwind CSS for custom styling; no theme forking     |
| IV. Type Safety                          | PASS   | TypeScript strict mode; Zod schemas for content; build fails on type errors        |
| V. Component-Driven Interactive Elements | PASS   | Svelte 5 islands with explicit hydration directives; props-driven, no global state |
| VI. Accessible & Performant              | PASS   | Starlight provides WCAG 2.1 AA baseline; Lighthouse CI in pipeline                 |

All gates pass. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/20260329-082123-project-scaffolding/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A for this feature)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
ltk-wiki/
├── astro.config.ts          # Astro + Starlight + integrations config
├── tailwind.config.ts       # Tailwind CSS v4 configuration
├── tsconfig.json            # TypeScript strict mode config
├── package.json             # Dependencies and scripts
├── .prettierrc              # Prettier config
├── .eslintrc.cjs            # ESLint config
├── src/
│   ├── content/
│   │   ├── config.ts        # Content collection schemas (Zod)
│   │   └── docs/            # All documentation pages
│   │       ├── getting-started/
│   │       │   ├── introduction.md
│   │       │   ├── installation.md
│   │       │   └── first-mod.md
│   │       ├── guides/
│   │       │   ├── mod-management/
│   │       │   │   ├── installing-mods.md
│   │       │   │   ├── profiles.md
│   │       │   │   ├── mod-folders.md
│   │       │   │   └── troubleshooting.md
│   │       │   ├── mod-creation/
│   │       │   │   ├── workshop-overview.md
│   │       │   │   ├── creating-a-project.md
│   │       │   │   ├── layers.md
│   │       │   │   └── packaging.md
│   │       │   └── contributing/
│   │       │       ├── wiki-authoring.md
│   │       │       └── project-guidelines.md
│   │       ├── tools/
│   │       │   ├── ltk-manager/
│   │       │   │   ├── overview.md
│   │       │   │   ├── features.md
│   │       │   │   └── configuration.md
│   │       │   └── league-toolkit/
│   │       │       ├── overview.md
│   │       │       └── crate-guide.md
│   │       ├── reference/
│   │       │   ├── file-formats/
│   │       │   │   ├── wad.md
│   │       │   │   ├── skn.md
│   │       │   │   ├── skl.md
│   │       │   │   ├── anm.md
│   │       │   │   ├── bin.md
│   │       │   │   ├── tex.md
│   │       │   │   ├── mapgeo.md
│   │       │   │   └── ritobin.md
│   │       │   ├── metaclasses/
│   │       │   │   └── overview.md
│   │       │   └── hashing/
│   │       │       └── algorithms.md
│   │       └── community/
│   │           ├── links.md
│   │           └── glossary.md
│   ├── components/          # Custom Svelte components (empty initially)
│   ├── styles/              # Custom CSS / Tailwind extensions
│   │   └── custom.css       # Starlight CSS custom property overrides
│   └── assets/              # Static assets (images, icons)
├── public/                  # Unprocessed static files (favicon, robots.txt)
└── .github/
    └── workflows/
        └── deploy.yml       # CI: type check → build → Lighthouse → deploy
```

**Structure Decision**: Single Astro project following Starlight conventions. Content lives in `src/content/docs/` organized by the information architecture from DESIGN.md. No backend, no separate frontend — everything is a single static site build.

## Complexity Tracking

No constitution violations. No complexity justifications needed.
