# LTK Wiki — Claude Code Guide

## Project Overview

LTK Wiki is the documentation and knowledge base for the LeagueToolkit ecosystem. It provides guides, tooling documentation, and reference material for League of Legends modding tools built by LeagueToolkit (ltk-manager, league-toolkit, lol-meta-classes, etc.).

Built with Astro Starlight, statically generated, and deployed to GitHub Pages.

## Quick Reference

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build (static output)
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm astro check

# Lint
pnpm lint

# Format
pnpm format
```

## Tech Stack

| Layer           | Technology                                        |
| --------------- | ------------------------------------------------- |
| Framework       | Astro with Starlight theme                        |
| Interactive UI  | Svelte 5 (island architecture)                    |
| Language        | TypeScript (strict mode)                          |
| Styling         | Tailwind CSS v4 + Starlight CSS custom properties |
| Content         | Markdown / MDX via Astro Content Collections      |
| Search          | Pagefind (bundled with Starlight)                 |
| Package Manager | pnpm                                              |
| Node            | >= 20 LTS                                         |
| Build Output    | Static HTML/CSS/JS only                           |
| CI              | GitHub Actions                                    |
| Hosting         | GitHub Pages (static)                             |

## Project Structure

```
ltk-wiki/
├── CLAUDE.md              # This file — AI/dev guidance
├── DESIGN.md              # Application design document
├── astro.config.ts        # Astro + Starlight configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── src/
│   ├── content/           # Content collections (Markdown/MDX)
│   │   ├── docs/          # Main documentation pages
│   │   │   ├── guides/    # How-to guides and tutorials
│   │   │   ├── tools/     # Tool-specific documentation
│   │   │   └── reference/ # API/format reference material
│   │   └── config.ts      # Content collection schemas (Zod)
│   ├── components/        # Custom Svelte components (interactive islands)
│   ├── layouts/           # Layout overrides (if needed)
│   ├── styles/            # Custom CSS / Tailwind extensions
│   └── assets/            # Static assets (images, icons)
├── public/                # Unprocessed static files
├── .specify/              # SpecKit workflow artifacts
│   ├── memory/            # Constitution and project memory
│   ├── specs/             # Feature specifications
│   ├── templates/         # SpecKit templates
│   └── scripts/           # SpecKit automation scripts
└── .github/
    └── workflows/         # CI/CD (build, deploy, Lighthouse)
```

## Architecture

### Content Model

All wiki content lives as `.md` or `.mdx` files in `src/content/docs/`. Astro Content Collections enforce frontmatter schemas via Zod validation at build time.

Content is organized into collections:

- **guides/** — Step-by-step tutorials and how-to articles
- **tools/** — Documentation for LeagueToolkit tools (ltk-manager, etc.)
- **reference/** — Technical reference (file formats, APIs, data structures)

### Rendering Pipeline

1. Markdown/MDX files are processed by Astro at build time
2. Starlight provides the documentation shell (nav, search, theme)
3. Svelte components hydrate as islands where interactivity is needed
4. Pagefind indexes all content for client-side search
5. Output is pure static HTML/CSS/JS — no server required

### Component Architecture

- **Astro components** (`.astro`) — Page layouts and static rendering
- **Svelte components** (`.svelte`) — Interactive islands with explicit hydration
  - `client:load` — Hydrate immediately (critical interactivity)
  - `client:visible` — Hydrate when scrolled into view
  - `client:idle` — Hydrate when browser is idle

## Key Patterns

### Content Authoring

```markdown
---
title: Getting Started with ltk-manager
description: Install and configure ltk-manager for League of Legends modding
---

# Getting Started

Content here...
```

- Frontmatter must conform to the content collection schema
- Use standard Markdown unless interactivity requires MDX
- MDX files import Svelte components for interactive elements
- Keep MDX logic minimal — extract complexity to components

### Starlight Customization

- Sidebar navigation defined in `astro.config.ts` (declarative)
- Theme customization via Starlight CSS custom properties
- Component overrides through Starlight's override system
- Tailwind utilities for custom styling

### TypeScript

- Strict mode enabled project-wide
- No `any` types (except unavoidable third-party declarations)
- Build fails on type errors

## Related Projects

| Project                                                               | Description                    | Relevance to Wiki       |
| --------------------------------------------------------------------- | ------------------------------ | ----------------------- |
| [ltk-manager](https://github.com/LeagueToolkit/ltk-manager)           | Mod manager (Tauri + React)    | Primary tool documented |
| [league-toolkit](https://github.com/LeagueToolkit/league-toolkit)     | Rust file format library       | Format reference source |
| [lol-meta-classes](https://github.com/LeagueToolkit/lol-meta-classes) | Metaclass extraction toolchain | Data model reference    |

## SpecKit Workflow

This project uses SpecKit for structured feature development:

```
/specify → /clarify → /plan → /tasks → /analyze → /implement
```

Specs live in `.specify/specs/{feature}/`. Constitution at `.specify/memory/constitution.md`.

## Active Technologies
- TypeScript (strict mode), Node >= 20 LTS + Astro + Starlight, Svelte 5, Tailwind CSS v4 (20260412-195002-wadtools-wiki-docs)
- N/A (static site, content as Markdown/MDX files) (20260412-195002-wadtools-wiki-docs)

- TypeScript (strict mode) on Node >= 20 LTS + Astro, @astrojs/starlight, Svelte 5 (@astrojs/svelte), Tailwind CSS v4 (@astrojs/tailwind), Pagefind (bundled with Starlight) (20260329-082123-project-scaffolding)
- N/A (static site, no database) (20260329-082123-project-scaffolding)

## Recent Changes

- 20260329-082123-project-scaffolding: Added TypeScript (strict mode) on Node >= 20 LTS + Astro, @astrojs/starlight, Svelte 5 (@astrojs/svelte), Tailwind CSS v4 (@astrojs/tailwind), Pagefind (bundled with Starlight)
