# Tasks: Project Scaffolding

**Input**: Design documents from `/specs/20260329-082123-project-scaffolding/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: Not requested in feature specification. Test tasks omitted.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Astro Starlight project with all required dependencies and base configuration

- [x] T001 Initialize Astro project with Starlight template, generating package.json with pnpm as package manager
- [x] T002 Install additional dependencies: @astrojs/svelte, svelte, @astrojs/tailwind, tailwindcss in package.json
- [x] T003 Configure TypeScript strict mode in tsconfig.json (extend Astro's strict preset, no `any` types)
- [x] T004 [P] Configure Tailwind CSS v4 in src/styles/custom.css with @import "tailwindcss" and Starlight CSS custom property overrides
- [x] T005 [P] Create .prettierrc with Astro and Svelte plugin configuration
- [x] T006 [P] Create eslint.config.mjs with TypeScript, Astro, and Svelte plugin configuration (flat config)
- [x] T007 Add lint and format scripts to package.json (`pnpm lint`, `pnpm format`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core Astro/Starlight configuration that MUST be complete before content or components can be added

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T008 Configure Astro integrations (Starlight, Svelte, Tailwind) in astro.config.ts with static output mode
- [x] T009 Define content collection schema using Starlight's docsSchema() with Zod validation in src/content.config.ts
- [x] T010 Create base directory structure: src/content/docs/, src/components/, src/styles/, src/assets/, public/

**Checkpoint**: Foundation ready — Astro builds, TypeScript checks pass, content collections are configured

---

## Phase 3: User Story 1 — Developer Runs the Wiki Locally (Priority: P1) MVP

**Goal**: A developer can clone, install, and run the wiki locally with a working Starlight shell (sidebar, search, theme toggle, hot reload)

**Independent Test**: Run `pnpm install && pnpm dev`, open browser, verify Starlight documentation shell loads with sidebar navigation, search bar, and dark/light theme toggle. Edit a content file and verify hot reload works.

### Implementation for User Story 1

- [x] T011 [US1] Configure declarative sidebar navigation in astro.config.ts with all five top-level section groups (Getting Started, Guides, Tools, Reference, Community) and nested sub-groups matching DESIGN.md hierarchy
- [x] T012 [US1] Create placeholder page src/content/docs/getting-started/introduction.md with valid frontmatter (title, description) and brief placeholder content
- [x] T013 [P] [US1] Create placeholder page src/content/docs/getting-started/installation.md with valid frontmatter and placeholder content
- [x] T014 [P] [US1] Create placeholder page src/content/docs/getting-started/first-mod.md with valid frontmatter and placeholder content
- [x] T015 [US1] Verify dev server starts successfully with `pnpm dev` and the Starlight shell renders with sidebar, search, and theme toggle

**Checkpoint**: User Story 1 complete — developer can clone, install, run dev server, and see a working wiki with Getting Started section in sidebar. Hot reload works on content changes.

---

## Phase 4: User Story 2 — Content Author Creates Documentation Pages (Priority: P2)

**Goal**: All five content sections are populated with placeholder pages, sidebar navigation mirrors the full information architecture, and frontmatter validation catches schema errors at build time

**Independent Test**: Create a new .md file in any content section with valid frontmatter; verify it appears in sidebar. Create one with invalid frontmatter; verify build fails with a clear validation error.

### Implementation for User Story 2

- [x] T016 [P] [US2] Create placeholder pages for src/content/docs/guides/mod-management/ (installing-mods.md, profiles.md, mod-folders.md, troubleshooting.md)
- [x] T017 [P] [US2] Create placeholder pages for src/content/docs/guides/mod-creation/ (workshop-overview.md, creating-a-project.md, layers.md, packaging.md)
- [x] T018 [P] [US2] Create placeholder pages for src/content/docs/guides/contributing/ (wiki-authoring.md, project-guidelines.md)
- [x] T019 [P] [US2] Create placeholder pages for src/content/docs/tools/ltk-manager/ (overview.md, features.md, configuration.md)
- [x] T020 [P] [US2] Create placeholder pages for src/content/docs/tools/league-toolkit/ (overview.md, crate-guide.md)
- [x] T021 [P] [US2] Create placeholder pages for src/content/docs/reference/file-formats/ (wad.md, skn.md, skl.md, anm.md, bin.md, tex.md, mapgeo.md, ritobin.md)
- [x] T022 [P] [US2] Create placeholder pages for src/content/docs/reference/metaclasses/overview.md and src/content/docs/reference/hashing/algorithms.md
- [x] T023 [P] [US2] Create placeholder pages for src/content/docs/community/ (links.md, glossary.md)
- [x] T024 [US2] Verify all sidebar groups render correctly and every placeholder page is navigable via the sidebar

**Checkpoint**: User Story 2 complete — all ~30 placeholder pages exist across 5 sections, sidebar navigation mirrors full information architecture, frontmatter validation works.

---

## Phase 5: User Story 3 — Production Build and Deployment (Priority: P3)

**Goal**: Production build succeeds with zero errors, type checking passes, and CI/CD pipeline deploys static output to GitHub Pages

**Independent Test**: Run `pnpm astro check` (zero type errors), `pnpm build` (succeeds, produces static output in dist/), `pnpm preview` (site is navigable). Push to main triggers CI workflow.

### Implementation for User Story 3

- [x] T025 [US3] Create GitHub Actions workflow at .github/workflows/deploy.yml with jobs: pnpm install, astro check, astro build, deploy to GitHub Pages via actions/deploy-pages
- [x] T026 [US3] Verify `pnpm astro check` passes with zero type errors
- [x] T027 [US3] Verify `pnpm build` completes successfully and produces static output in dist/
- [x] T028 [US3] Verify `pnpm preview` serves the built site and all pages are navigable with working search

**Checkpoint**: User Story 3 complete — production build works, type checking passes, CI/CD pipeline is configured for GitHub Pages deployment.

---

## Phase 6: User Story 4 — Contributor Adds an Interactive Component (Priority: P4)

**Goal**: The project supports Svelte 5 island components in MDX pages with explicit hydration directives, proven by a working example

**Independent Test**: Create a sample Svelte component, import it in an MDX file with `client:visible`, verify it renders statically at build time and hydrates interactively in the browser.

### Implementation for User Story 4

- [x] T029 [US4] Create a sample Svelte 5 component at src/components/Counter.svelte (simple interactive counter with props interface) to validate the island architecture
- [x] T030 [US4] Create an MDX example page at src/content/docs/guides/contributing/wiki-authoring.mdx that imports and renders the Counter component with `client:visible` hydration directive (replacing the .md placeholder)
- [x] T031 [US4] Verify the Svelte component renders in dev server and production build, and hydrates interactively in the browser

**Checkpoint**: User Story 4 complete — Svelte 5 islands work in MDX pages with explicit hydration. Contributors have a working example to follow.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cleanup across all user stories

- [x] T032 [P] Run `pnpm lint` and fix any linting issues across all source files
- [x] T033 [P] Run `pnpm format` and ensure all files are formatted consistently
- [x] T034 Verify Pagefind search indexes all placeholder content and returns results for queries across all sections
- [x] T035 Run quickstart.md validation: follow the quickstart guide end-to-end on a clean clone to verify accuracy

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) — no dependencies on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational (Phase 2) — can run in parallel with US1, but logically builds on US1's sidebar config
- **User Story 3 (Phase 5)**: Depends on User Stories 1 and 2 (needs content to build/deploy)
- **User Story 4 (Phase 6)**: Depends on Foundational (Phase 2) — can run in parallel with US1/US2
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: After Phase 2. Creates sidebar config and initial pages — establishes the foundation others build on.
- **User Story 2 (P2)**: After Phase 2. Can start after US1 (uses its sidebar config). All placeholder page tasks are parallelizable.
- **User Story 3 (P3)**: After US1 + US2 (needs full content for meaningful build/deploy validation).
- **User Story 4 (P4)**: After Phase 2. Independent of content — only needs Svelte integration working.

### Within Each User Story

- Configuration before content files
- Content files can be created in parallel (marked [P])
- Verification tasks run last

### Parallel Opportunities

- T004, T005, T006 can run in parallel (Setup phase — different files)
- T013, T014 can run in parallel (US1 — independent .md files)
- T016–T023 can ALL run in parallel (US2 — independent .md files in different directories)
- T032, T033 can run in parallel (Polish — different tools)
- US4 can run in parallel with US1/US2 (independent Svelte integration)

---

## Parallel Example: User Story 2

```bash
# Launch all placeholder page tasks together (all [P], different directories):
Task: "T016 Create placeholder pages for guides/mod-management/"
Task: "T017 Create placeholder pages for guides/mod-creation/"
Task: "T018 Create placeholder pages for guides/contributing/"
Task: "T019 Create placeholder pages for tools/ltk-manager/"
Task: "T020 Create placeholder pages for tools/league-toolkit/"
Task: "T021 Create placeholder pages for reference/file-formats/"
Task: "T022 Create placeholder pages for reference/metaclasses/ and reference/hashing/"
Task: "T023 Create placeholder pages for community/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T007)
2. Complete Phase 2: Foundational (T008–T010)
3. Complete Phase 3: User Story 1 (T011–T015)
4. **STOP and VALIDATE**: Dev server runs, Starlight shell works, Getting Started section navigable
5. This is a deployable MVP — a working wiki skeleton

### Incremental Delivery

1. Setup + Foundational → Project initialized
2. Add User Story 1 → Working wiki with Getting Started section (MVP)
3. Add User Story 2 → Full content structure across all 5 sections
4. Add User Story 3 → CI/CD pipeline, production build, GitHub Pages deployment
5. Add User Story 4 → Svelte island architecture proven with example component
6. Polish → Linting, formatting, search validation, quickstart verification

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (sidebar config + getting-started pages)
   - Developer B: User Story 4 (Svelte component integration)
3. After US1 sidebar config exists:
   - Developer A: User Story 2 (all placeholder pages — highly parallelizable)
   - Developer B: User Story 3 (CI/CD pipeline)
4. Polish phase together

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- No test tasks generated (not requested in spec)
