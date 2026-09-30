---
version: 1
slug: "src-content-docs-index-mdx"
primary_target: "src/content/docs/index.mdx"
related_targets: ["src/components/starlight/Hero.astro"]
---

# Home page

- **Scope:** `src/content/docs/index.mdx` (splash) and the components it imports. Visitor mode: Persuade.
- **Audience:** players first (newcomers, often arriving from a Discord link), then creators, then tool authors.
- **Job:** show the ecosystem. A visitor sees each tool working in a real capture, understands how a mod reaches the game, and leaves on the right route.
- **Action:** download LTK Manager (primary); quick start; the per-tool routes.
- **Proof:** real captures only (`src/assets/screenshots/`, `src/assets/videos/`). No counts, users, or claims.
- **Constraints:** the Signal on Slate world in DESIGN.md is fixed. Copy lives in `index.mdx` props, not components. Routes point only at finished pages (most LTK Editor pages are under construction). The cslol migration note leaves the home page.
- **Chosen direction:** Product Chapters.
- **Memorable moment:** the redirect band, where a signal travels from League to the patcher and forks into the overlay while the game files stay dark.

## Direction contract

THESIS: The toolkit told as chapters, each tool shown working in its own real capture, with the mechanism drawn once between them. It refuses the category default of a centered hero over grids of identical icon cards.

OWN-WORLD: Deep Graphite ground; the Cobalt to Violet ramp only as hairlines, capture frame edges, and the travelling signal; Bricolage for the wordmark and chapter titles, Geist for everything read; captures in 1px line-step frames with large corners, flat at rest; routes as plain link lists with a trailing arrow, never cards.

STORY: The visitor learns LTK is a set of tools, sees LTK Manager's library, sees how the patcher answers the game with their files while Riot's stay untouched, sees LTK Editor drawing a real map with the game's shaders, and picks a route: download, quick start, a creator page, or the format reference.

FIRST VIEWPORT: At 1440x900, a 5/7 split inside the 67.5rem container. Left: the "League Toolkit" wordmark at display scale, the tagline (three lines at 1440 in the 5fr column; copy unchanged), the Download LTK Manager primary action beside a Quick start ghost action, and a small note that it is the Windows installer from the latest GitHub release. Right: the LTK Manager library capture in a hairline frame topped by the brand ramp, running off the right edge of the viewport. The LTK Manager chapter title peeks above the fold.

FORM: Product Chapters, position 5 on the ordered list of seven, seed key e7d9342a.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- None blocking. Revisit Ch.2 routes when LTK Editor pages leave construction.
