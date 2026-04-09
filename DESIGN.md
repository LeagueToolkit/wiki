# LTK Wiki — Design Document

## 1. Vision

A comprehensive, community-driven documentation wiki for the LeagueToolkit ecosystem. The wiki serves as the single source of truth for League of Legends modding knowledge — from beginner guides to deep technical references on file formats and tooling.

### Goals

- **Accessible**: Newcomers can learn modding from zero
- **Comprehensive**: Covers all LeagueToolkit tools and LoL file formats
- **Searchable**: Full-text search across all content
- **Fast**: Static generation, sub-second page loads
- **Maintainable**: Content-as-code, PR-based contribution workflow
- **Interactive**: Embedded tools where static content isn't enough

## 2. Target Audience

### Personas

**Mod User** — Wants to install and manage mods using ltk-manager. Needs clear setup guides, troubleshooting steps, and FAQ answers.

**Mod Creator** — Builds custom skins, maps, or gameplay mods. Needs tool documentation (ltk-manager Creator Workshop), file format references, and best practices.

**Tool Developer** — Builds or extends modding tools using league-toolkit or related libraries. Needs API references, format specifications, and architecture docs.

**Contributor** — Contributes to LeagueToolkit projects or the wiki itself. Needs contribution guides and project conventions.

## 3. Information Architecture

### Content Hierarchy

```
docs/
├── getting-started/           # Onboarding flow
│   ├── introduction.md        # What is LeagueToolkit?
│   ├── installation.md        # Installing ltk-manager
│   └── first-mod.md           # Install your first mod
│
├── guides/                    # Task-oriented how-to articles
│   ├── mod-management/        # Using ltk-manager as a player
│   │   ├── installing-mods.md
│   │   ├── profiles.md
│   │   ├── mod-folders.md
│   │   └── troubleshooting.md
│   ├── mod-creation/          # Creating mods
│   │   ├── workshop-overview.md
│   │   ├── creating-a-project.md
│   │   ├── layers.md
│   │   └── packaging.md
│   └── contributing/          # Contributing to LeagueToolkit
│       ├── wiki-authoring.md
│       └── project-guidelines.md
│
├── tools/                     # Tool-specific documentation
│   ├── ltk-manager/           # Mod manager docs
│   │   ├── overview.md
│   │   ├── features.md
│   │   └── configuration.md
│   └── league-toolkit/        # Rust library docs
│       ├── overview.md
│       └── crate-guide.md
│
├── reference/                 # Technical reference material
│   ├── file-formats/          # LoL file format specs
│   │   ├── wad.md             # WAD archives
│   │   ├── skn.md             # Skinned meshes
│   │   ├── skl.md             # Skeletons
│   │   ├── anm.md             # Animations
│   │   ├── bin.md             # Property bins
│   │   ├── tex.md             # Textures
│   │   ├── mapgeo.md          # Map geometry
│   │   └── ritobin.md         # Ritobin text format
│   ├── metaclasses/           # LoL metaclass reference
│   │   └── overview.md
│   └── hashing/               # Hash function reference
│       └── algorithms.md
│
└── community/                 # Community resources
    ├── links.md               # Useful links and tools
    └── glossary.md            # Modding terminology
```

### Navigation Model

Sidebar navigation is defined declaratively in `astro.config.ts` using Starlight's sidebar configuration. Structure mirrors the content hierarchy above with collapsible groups.

Top-level sections:

1. **Getting Started** — Linear onboarding flow
2. **Guides** — Task-oriented articles grouped by topic
3. **Tools** — Per-tool documentation
4. **Reference** — Technical specs and data
5. **Community** — External resources and glossary

## 4. Content Model

### Frontmatter Schema

All docs pages share a base schema enforced by Astro Content Collections:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    schema: docsSchema(),
  }),
};
```

Starlight's `docsSchema()` provides: `title`, `description`, `sidebar`, `tableOfContents`, `editUrl`, `head`, `hero`, etc.

Custom extensions (if needed) can wrap `docsSchema()` with additional Zod fields.

### Content Types

| Type            | Format | When to Use                       |
| --------------- | ------ | --------------------------------- |
| Standard doc    | `.md`  | Text, images, code blocks, tables |
| Interactive doc | `.mdx` | Needs embedded Svelte components  |

## 5. Interactive Components

Planned Svelte islands for enhanced content:

### File Format Viewer

An interactive hex/structure viewer for LoL file formats. Users can upload or select sample files and see the parsed structure annotated inline. Hydration: `client:visible`.

### Metaclass Browser

A searchable, filterable table of LoL metaclass definitions sourced from lol-meta-classes dumps. Supports version comparison. Hydration: `client:load`.

### Code Playground

Embedded code examples with live output for demonstrating league-toolkit API usage. Hydration: `client:visible`.

### Mod Preview

Before/after image comparison slider for mod screenshots. Hydration: `client:visible`.

## 6. Deployment & CI

### Build Pipeline

```
Push to main
  → GitHub Actions
    → pnpm install
    → astro check (type validation)
    → astro build (static generation)
    → Lighthouse CI (performance audit)
    → Deploy to GitHub Pages
```

### Performance Targets

| Metric                   | Target  |
| ------------------------ | ------- |
| Lighthouse Performance   | >= 90   |
| First Contentful Paint   | < 1.5s  |
| Total Blocking Time      | < 200ms |
| Largest Contentful Paint | < 2.5s  |

### Deployment

Static output deployed to GitHub Pages via `actions/deploy-pages`. No server infrastructure required.

## 7. Theming & Branding

- Base: Starlight default theme with dark mode preference
- Brand colors: LeagueToolkit palette (defined as CSS custom properties)
- Typography: Starlight defaults with potential custom heading font
- Custom CSS via Tailwind utilities layered on Starlight's design tokens
- Logo and favicon from LeagueToolkit branding assets

## 8. Future Considerations

- **i18n**: Starlight has built-in i18n support; content translation can be added later
- **Versioned docs**: Version-specific documentation for ltk-manager releases
- **API docs auto-generation**: Pull rustdoc from league-toolkit into reference pages
- **Community contributions**: Streamlined PR template for content submissions
- **Analytics**: Privacy-respecting analytics (Plausible or similar) for content prioritization
