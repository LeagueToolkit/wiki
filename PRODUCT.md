# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: players.** Someone who plays League of Legends, has never modded it, and wants mods
  working through LTK Manager. When reader needs compete, this reader wins. Outside LTK Editor and
  Reference, pages assume no modding knowledge and define terms like mod, patch, and profile on
  first use.
- **Creators.** People building mods in LTK Editor. They need every editor, panel, and field
  explained, with its meaning in the game.
- **Tool authors.** Developers of launchers, mod sites, and creation tools. They use Reference
  (file formats, packages, hashing) and the ecosystem integration pages.
- **Contributors.** People writing wiki pages or contributing to LeagueToolkit projects.

## Product Purpose

LTK Wiki is the documentation site for the LeagueToolkit ecosystem: guides for LTK Manager and
LTK Editor, and technical reference for the League of Legends file formats and libraries behind
them. It takes a player from zero to a first working mod, and takes a creator from a first mod to
every editor in depth.

Success at launch: support questions in Discord get answered with a link to a wiki page instead of
a repeated explanation. The launch trigger is complete LTK Manager documentation, which means no
`WIP` badges left in the Manager sidebar.

## Positioning

- **Official source.** Maintained by the LeagueToolkit team alongside the tools, and documents the
  current release only. No "new in 0.x", no history, no counts that go stale.
- **Verified accuracy.** Reverse-engineered format detail is read from source, never invented.
  Guesses are labelled as guesses; unidentified fields are named `unknown_0x14`, not given a
  plausible wrong name.
- **Ecosystem standard.** The wiki defines the mod project and package standards that other
  launchers, mod sites, and creation tools build against, so their output works with every other
  tool.

## Operating Context

- LTK Manager is the official successor to cslol-manager, which is being deprecated. Many players
  arrive with cslol habits and existing mods; a migration guide exists at `/start-here/from-cslol/`.
- The landing page's primary action downloads the LTK Manager installer
  (`LTK.Manager_x64-setup.exe`) from the latest GitHub release.
- Players often arrive around patch day, when the game updates and mods need attention.
- Community support happens in Discord; the project lives on GitHub (both linked in the header).
- Pages are contributed as Markdown/MDX through pull requests (docs-as-code).

## Capabilities and Constraints

- **Sections:** Start Here, LTK Manager, LTK Editor, Making Mods, Reference, Tools, Developers,
  Contributing, Community, Glossary. Navigation is declared in `astro.config.ts`.
- **Page types:** concept, task, reference, quick start, overview, plus troubleshooting and FAQ.
  One type per page, and the title shape shows the type (see `/contributing/wiki-authoring/`).
- **Interactive tools** exist as Svelte islands where static content is not enough (glossary
  search, hash calculator, binary structure viewer, version matrix, patching pipeline).
- **Static only.** Every page is statically generated; interactivity must never be required to
  read content. Deployed as an assets-only Cloudflare Worker at `wiki.leaguetoolkit.dev`.
- **Search** is Pagefind, bundled with Starlight.
- **Pre-launch.** Page moves need no redirect today. From launch, every move adds a permanent
  redirect that is never removed.
- **Undecided:** internationalization, versioned docs, and analytics are future considerations
  with no decision yet.

## Brand Commitments

- **Names:** LTK Wiki (the site), League Toolkit / LeagueToolkit (the ecosystem), LTK Manager and
  LTK Editor (the apps). Never "Workshop" or "Creator Workshop".
- **Assets:** `src/assets/logo.svg`, `public/favicon.svg`, OG cards in `src/assets/og/`.
- **Voice:** second person, present tense, active voice. Concrete claims or none. No emoji, no em
  dashes, no smart quotes, no hollow openers or rule-of-three padding. UI labels in bold exactly as
  the app shows them; verbs are select, enter, turn on, turn off, press. Full rules in `AGENTS.md`
  and `/contributing/wiki-authoring/`.
- **Straight talk on risk.** The FAQ states that modding is against Riot's Terms of Service and
  never promises account safety. Future copy must not soften that.

## Evidence on Hand

- Real app screenshots: `src/assets/screenshots/manager/` and `src/assets/screenshots/editor/`.
- Editor videos: `src/assets/videos/editor/`.
- Written guides and reference pages under `src/content/docs/`.
- No user counts, download numbers, testimonials, or endorsements exist. Do not fabricate them.

## Product Principles

1. **The newcomer is the front door.** A player with no modding knowledge reaches a working mod
   without reading anything aimed at creators or tool authors.
2. **Accuracy over completeness.** A missing field is better than an invented one. Unknowns are
   labelled, not guessed into shape.
3. **One answer, one link.** Each page answers one kind of question well enough to be the link
   posted in Discord.
4. **Current truth only.** Pages describe the latest release; history belongs in release notes.
5. **A shared standard.** Reference and ecosystem pages are written so another tool can implement
   against them.

## Accessibility & Inclusion

- WCAG 2.1 AA, semantic HTML, alt text on every image, full keyboard navigation (project
  constitution, `.specify/memory/constitution.md`).
- Light and dark themes are both first-class.
- `prefers-reduced-motion` is respected globally and in any component that animates.
- Performance targets: Lighthouse Performance >= 90, FCP < 1.5s, TBT < 200ms.
