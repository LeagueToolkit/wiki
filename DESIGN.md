---
name: LTK Wiki
description: Documentation for the LeagueToolkit modding ecosystem, set as signal on slate.
colors:
  cobalt-current: '#4b7dfa'
  arc-violet: '#7d4bfa'
  on-brand: '#ffffff'
  accent-low: '#1a1640'
  accent-high: '#b9e5fb'
  accent-light: '#3a5ec4'
  accent-low-light: '#e8f0ff'
  accent-high-light: '#1a1640'
  graphite-page: '#0c0d18'
  graphite-panel: '#14152a'
  graphite-raised: '#1e2035'
  graphite-line: '#33364a'
  graphite-muted: '#8189a6'
  graphite-soft: '#aeb4ca'
  graphite-text: '#d3d7e4'
  graphite-bright: '#f0f2f8'
  paper-page: '#fafbfc'
  paper-panel: '#f0f2f5'
  paper-raised: '#e0e3ea'
  paper-line: '#c4c8d4'
  paper-muted: '#8b8fa3'
  paper-soft: '#5a5e72'
  paper-text: '#33364a'
  paper-bright: '#1a1c2e'
  success: '#22c55e'
  warning: '#f59e0b'
  danger: '#ef4444'
  required: '#f193a9'
  required-light: '#ad3a58'
  wordmark-frost: '#cfeafd'
  wordmark-periwinkle: '#86a9ff'
  wordmark-lilac: '#a482ff'
  wordmark-navy-light: '#1e2a5e'
  wordmark-cobalt-light: '#2f4bb0'
  wordmark-violet-light: '#6a45d8'
typography:
  display:
    fontFamily: 'Bricolage Grotesque, Geist, system-ui, sans-serif'
    fontSize: 'clamp(2.5rem, 7vw, 4.5rem)'
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: '-0.035em'
  display-section:
    fontFamily: 'Bricolage Grotesque, Geist, system-ui, sans-serif'
    fontSize: 'clamp(1.5rem, 3vw, 1.875rem)'
    fontWeight: 700
    letterSpacing: '-0.03em'
  headline:
    fontFamily: 'Geist, system-ui, sans-serif'
    fontSize: 'clamp(1.75rem, 4vw, 2.25rem)'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: '-0.02em'
  title:
    fontFamily: 'Geist, system-ui, sans-serif'
    fontSize: 'clamp(1.375rem, 3vw, 1.625rem)'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '-0.02em'
  subtitle:
    fontFamily: 'Geist, system-ui, sans-serif'
    fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '-0.02em'
  body:
    fontFamily: 'Geist, system-ui, sans-serif'
    fontSize: '0.9375rem'
    fontWeight: 400
    lineHeight: 1.7
  body-small:
    fontFamily: 'Geist, system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: 'Geist, system-ui, sans-serif'
    fontSize: '0.8125rem'
    fontWeight: 500
  label:
    fontFamily: 'Geist, system-ui, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 500
    lineHeight: 1.5
  micro:
    fontFamily: 'Geist, system-ui, sans-serif'
    fontSize: '0.6875rem'
    fontWeight: 500
  mono:
    fontFamily: 'JetBrains Mono, ui-monospace, monospace'
    fontFeature: "'calt' 0, 'liga' 0"
rounded:
  sm: '0.25rem'
  md: '0.375rem'
  lg: '0.5rem'
  chip: '1rem'
  pill: '999px'
components:
  button-primary:
    backgroundColor: '{colors.arc-violet}'
    textColor: '{colors.on-brand}'
    typography: '{typography.body}'
    rounded: '{rounded.md}'
    padding: '0.7rem 1.35rem'
  button-ghost:
    textColor: '{colors.graphite-bright}'
    rounded: '{rounded.md}'
    padding: '0.7rem 1.35rem'
  button-ghost-hover:
    backgroundColor: '{colors.graphite-panel}'
  button-download:
    backgroundColor: '{colors.arc-violet}'
    textColor: '{colors.on-brand}'
    rounded: '{rounded.md}'
    padding: '0.85rem 1.6rem'
  card-path:
    backgroundColor: '{colors.graphite-panel}'
    textColor: '{colors.graphite-soft}'
    rounded: '{rounded.lg}'
    padding: '1.75rem'
  card-topic:
    textColor: '{colors.graphite-soft}'
    rounded: '{rounded.lg}'
    padding: '1.25rem 1.375rem'
  card-topic-hover:
    backgroundColor: '{colors.graphite-panel}'
  chip-tag:
    textColor: '{colors.graphite-soft}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '0.15rem 0.55rem'
  chip-tag-subject:
    textColor: '{colors.accent-high}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '0.15rem 0.55rem'
  chip-tag-status:
    textColor: '{colors.warning}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '0.15rem 0.55rem'
  nav-row:
    textColor: '{colors.graphite-soft}'
    rounded: '{rounded.sm}'
  nav-row-current:
    textColor: '{colors.graphite-bright}'
    rounded: '{rounded.sm}'
  search-pill:
    backgroundColor: '{colors.graphite-panel}'
    textColor: '{colors.graphite-soft}'
    rounded: '{rounded.pill}'
    padding: '0.5rem 0.875rem'
  where-box:
    backgroundColor: '{colors.graphite-panel}'
    textColor: '{colors.graphite-bright}'
    rounded: '{rounded.lg}'
    padding: '0.75rem 1rem'
  tooltip:
    backgroundColor: '{colors.graphite-raised}'
    textColor: '{colors.graphite-bright}'
    rounded: '{rounded.md}'
    padding: '0.5rem 0.75rem'
  screenshot-marker:
    backgroundColor: '{colors.cobalt-current}'
    textColor: '{colors.on-brand}'
    rounded: '{rounded.pill}'
    height: '1.5rem'
---

# Design System: LTK Wiki

## Overview

**Creative North Star: "Signal on Slate"**

Deep Graphite surfaces carry the reading. The logo's Cobalt Current to Arc Violet ramp is a signal: it marks where you are, what you can press, and where the site's name sits. It shows on edges, hairlines, washes, and current state, and almost never as a filled area. A reader spends most of the page in calm cool-grey prose at a 48rem measure. The brand color shows up at the header hairline, the current sidebar row, a card's ring on hover, and the one primary action.

The site is dark-first and both themes are first-class. Every value either comes from a theme-aware Starlight token or has an explicit light counterpart. The system is built on Starlight, not in place of it: it overrides Starlight's own components and tokens, and does not ship a parallel theme. Density is documentation density: compact type (0.9375rem body), generous line height (1.7), small radii, hairline borders.

Rejected directions, confirmed: gamer RGB (neon glows, aggressive angles, esports-overlay chrome), imitating the League client or Riot's official branding, stock Starlight with only the accent swapped, and SaaS marketing tropes (gradient hero blobs, feature grids, testimonial carousels).

**Key Characteristics:**

- The brand ramp as an edge and state signal, never a background field.
- Quiet at rest, lit on intent: neutral outlines and muted glyphs until hover or current state.
- Frosted chrome (the header) over flat, opaque content surfaces.
- One display face (Bricolage Grotesque) for rare, loud moments; Geist for everything read.
- Colors and weights are always tokens; no raw literals in stylesheet rules.

## Colors

Cool blue-violet graphite neutrals with a two-stop brand ramp taken from the logo, plus a small semantic status set.

### Primary

- **Cobalt Current** (`cobalt-current`): the leading half of the brand ramp and the site's accent in dark mode. Header hairline, reading-progress fill, current section underline, sidebar current-row wash, link-card ring, screenshot markers. Theme-invariant: it is always mixed against a surface, never swapped per theme.
- **Frost Blue** (`accent-high`): the bright accent on dark. Link hover, subject tag text, hovered topic-card glyph and arrow, focus outlines. In light mode the same role flips to a deep navy (`accent-high-light`).
- **Cobalt Ink** (`accent-light`): the accent in light mode, darker so it holds contrast on near-white.

### Secondary

- **Arc Violet** (`arc-violet`): the trailing half of the ramp. It never appears alone as a state color; it always travels with Cobalt Current in a gradient (primary buttons run violet to blue at 135deg, hairlines run blue to violet at 90deg). The violet path card uses it as its tone.

### Neutral

- **Deep Graphite** family, dark theme: page (`graphite-page`), panel (`graphite-panel`) for table heads, Where boxes, and card fills; raised (`graphite-raised`) for inline code and tooltips; line (`graphite-line`) for borders, keycaps, and scrollbar thumbs; then muted, soft, text, and bright for text from captions up to headings.
- **Paper** family, light theme: the same eight steps inverted (`paper-page` through `paper-bright`). They map onto the same Starlight slots (`--sl-color-black` through `--sl-color-white`), so a rule written against those slots works in both themes.

### Status

- **Success, Warning, Danger** (`success`, `warning`, `danger`): theme-invariant fills and borders. Warning as small text uses a darker variant in light mode (`--ltk-warning-text`, 60% warning mixed with black).
- **Required Rose** (`required`, `required-light`): the required-field marker in reference tables. It is rose so "must provide" reads apart from links and code. It flips per theme for contrast.

### Wordmark

- **Wordmark ramp** (`wordmark-frost` to `wordmark-periwinkle` to `wordmark-lilac` on dark; `wordmark-navy-light` to `wordmark-cobalt-light` to `wordmark-violet-light` on light): the gradient fill of the header title and the hero accent, held in `--ltk-wordmark`. Its stops sit at similar lightness so the short ramp fades instead of banding. It is used for these two names only, never as body text.

### Text on accent

Text on a solid accent fill (active filter chips, the active pipeline step) uses `--sl-color-text-invert`: deep indigo on dark, near-white on light. Plain white on dark-mode Cobalt fails AA for small text.

### Named Rules

**The Signal Budget Rule.** The Cobalt to Violet ramp appears only on edges (hairlines, rings, underlines), current-state washes, the wordmark, and primary actions. Never as a section background, a prose text color, or a decorative blob.

**The Theme Pair Rule.** Every color decision has a `:root[data-theme='light']` counterpart or uses a `--sl-color-*` token that already inverts. A value that only works on dark is not finished.

**The Token-Only Rule.** Stylesheet colors are a token reference (`--sl-color-*`, `--ltk-*`) or a `color-mix()` of tokens, never a raw hex or rgba. Mint a token in the matching `custom.css` section when none fits. Script-side color data (the Mermaid theme, BinaryStructure's categorical palette) is exempt.

## Typography

**Display Font:** Bricolage Grotesque (with Geist, then system-ui)
**Body Font:** Geist (with system-ui, sans-serif)
**Mono Font:** JetBrains Mono (with ui-monospace, monospace)

**Character:** Geist is a neutral, engineered grotesque that stays out of the way of long technical prose. Bricolage Grotesque is its louder, slightly quirky cousin, saved for the few moments that announce something. JetBrains Mono carries code, keycaps, and badge labels. All three are self-hosted through Astro's Fonts API.

### Hierarchy

- **Display** (700, clamp(2.5rem, 7vw, 4.5rem), 1.03, -0.035em): the splash hero headline only, balanced wrap, part of it filled with the wordmark gradient.
- **Display section** (700, clamp(1.5rem, 3vw, 1.875rem), -0.03em): landing-page section titles, each topped by a short 2.25rem violet-to-blue rule.
- **Headline** (700, clamp(1.75rem, 4vw, 2.25rem), 1.2, -0.02em): page titles (h1).
- **Title** (600, clamp(1.375rem, 3vw, 1.625rem), 1.2, -0.02em): h2 in prose.
- **Subtitle** (600, clamp(1.125rem, 2.5vw, 1.25rem), 1.2, -0.02em): h3 in prose.
- **Body** (400, 0.9375rem, 1.7): paragraphs and list items. The 1.7 line height applies to unclassed prose only; component parts set their own. Measure is capped by the 48rem content column.
- **Body small** (400, 0.875rem, 1.6): card descriptions, tables, component prose.
- **Caption** (500, 0.8125rem): control labels and secondary lines inside interactive components.
- **Label** (500, 0.75rem, 1.5): page tags, table code, tooltip text, small UI labels. Status tags alone go uppercase with 0.03em tracking.
- **Micro** (500, 0.6875rem): the smallest step, for chip counts, byte offsets, and dense diagram labels. Nothing smaller except a one-off.

The weight scale is three tokens: medium 500 (labels, secondary emphasis), semibold 600 (headings, UI emphasis, current nav row), bold 700 (page title, hero, wordmark). Body rides the face default.

### Named Rules

**The Rare Display Rule.** Bricolage Grotesque appears only on the hero headline, the header wordmark, landing section titles, and path card titles. Page content headings stay in Geist.

**The Copy-What-You-See Rule.** Code ligatures are off (`calt` and `liga` 0) on every code surface, because readers copy what they see.

## Layout

A Starlight three-column docs layout: sidebar, a 48rem content column, and a narrowed 14rem table-of-contents column (Starlight's default ties the TOC to the sidebar width; the site restates the formulas with `--ltk-toc-width`). The TOC column appears at 72rem and wider.

- **Breakpoints observed:** 45rem (card grids go from one column to two), 50rem (header section nav appears; below it the mobile chrome hides on scroll), 72rem (TOC column).
- **Card grids** are two equal columns with a 1rem gap above 45rem, one column below. Pagination cards stay side by side down to 11rem tracks.
- **Splash page** has no sidebar: a centered hero column, then path cards set close under it (short hero bottom padding, so the cards read as the hero's real call to action), then 4rem-spaced sections.
- **Mobile chrome:** below 50rem the header and the "On this page" bar slide fully off-screen when scrolling down and return on any scroll up. Keyboard focus inside the header pins it in place.
- **Tables** are their own horizontal scroll container, hugging their content width, never forcing the page to scroll.
- Spacing has no token scale. Values are local (1rem grid gaps, 1.25rem to 1.75rem card padding, 2.5rem around rules), which is deliberate: incidental sizes stay inline.

## Elevation & Depth

Flat by default. Depth comes from tonal steps in the Graphite ramp (page, panel, raised) and hairline borders, not from shadows. Two things break flatness: frosted glass for chrome and floating UI, and a small lift plus colored glow when something is pressable and hovered.

### Glass tiers

Every frosted surface takes its fill and blur from the same tier:

- **Chrome** (`--ltk-glass-chrome-*`): the header. Near-opaque fill at 97% with no blur support, 65% with it; blur 24px with 140% saturation.
- **Panel** (`--ltk-glass-panel-*`): tooltips and the sidebar search pill. 70% of the raised step, 10px blur, always behind an `@supports` guard with a solid fallback.
- **Scrim** (`--ltk-glass-scrim-*`): chips on imagery. Theme-invariant black at 60%, 4px blur, because an image has no theme.

### Shadow Vocabulary

- **Brand glow** (`--ltk-glow-brand`: `0 0.5rem 1.5rem -0.5rem` of Cobalt Current at 70%, deepening via `--ltk-glow-brand-hover` to `0 0.75rem 2rem -0.5rem` of Arc Violet at 85%): primary gradient actions only (hero primary, Download button).
- **Float** (`--ltk-shadow-float`: `0 4px 12px` black at 30%): tooltips and other floating panels.
- **Wordmark bloom** (split drop-shadows, blue left and violet right, over a wide blue ambient): the header title on hover.

### Named Rules

**The Flat-at-Rest Rule.** Surfaces are flat at rest. Lift (translateY -1px to -3px) and colored glow appear only in response to hover on something pressable, and lift is disabled under `prefers-reduced-motion`.

**The Same-Tier Glass Rule.** A frosted surface takes both its fill and its blur from one glass tier, and lists `-webkit-backdrop-filter` before `backdrop-filter`.

## Shapes

Small, consistent corners on one three-step scale, with pills reserved for geometry.

- **Large** (`--ltk-radius-lg`, 0.5rem): cards, tables, asides, code blocks, file trees, Where boxes, the screenshot placeholder.
- **Medium** (`--ltk-radius-md`, 0.375rem): buttons, inputs, tooltips, icon chips inside cards.
- **Small** (`--ltk-radius-sm`, 0.25rem): sidebar rows, tags, keycaps, inline code pills.
- **Chip** (1rem): filter chips and count pills inside interactive components.
- **Pill** (999px or 50%): only for shapes that are round by nature: the search pill, badges, screenshot markers, dots.

Borders are 1px hairlines in the line or raised step. Asides carry a 3px accent stripe as a clipped overlay, so it stays straight at rounded corners; blockquotes get only a 1px neutral rule in the line step. Keycaps carry a 2px bottom border to read as physical keys.

## Components

### Buttons

- **Shape:** medium corners (0.375rem), 0.7rem by 1.35rem padding, semibold, a trailing arrow glyph that nudges 2px right on hover.
- **Primary:** Arc Violet to Cobalt Current gradient at 135deg, white text, brand glow. Hover lifts 1px and deepens the glow toward violet.
- **Ghost:** transparent with a line-step border and bright text; hover strengthens the border and fills with the panel step. The arrow stays muted.
- **Download:** the primary treatment scaled up (0.85rem by 1.6rem, large text) with a masked Phosphor glyph. Used where a page's single job is getting the installer.
- **Focus:** 2px outline in Frost Blue, 3px offset.

### Cards / Containers

- **Path cards** (landing only, two of them): the most important choice on the site, so they get their own component. Panel fill at 70%, line border, 1.75rem padding, a Bricolage title with an icon chip on the same line. Each card has a tone (Cobalt or Violet) shown as a top-edge hairline at rest. On hover: 3px lift, border tinted to the tone, a tone wash bleeding down from the top.
- **Topic cards:** transparent with a line border, 1.25rem by 1.375rem padding, a masked Phosphor glyph, a semibold title, and a trailing arrow. At rest the glyph and arrow are muted; on hover the border tints to the accent, the panel fill arrives, and the glyph and arrow turn Frost Blue.
- **Link cards** (Starlight's): a gradient ring (blue to violet) at 40% on dark, 55% on light, rising to 100% with a panel fill on hover. The ring is painted on the border box under an opaque padding-box fill, so the card must sit on the page background.
- **Asides:** a card, not Starlight's flat panel: a tinted border at 30%, a fill of 8% of the aside color over the panel step, and a 3px left stripe. Note and tip hues are shifted to the logo's blue (223) and violet (257).

### Chips (page tags)

- **Style:** label type, small corners, line-step border, soft text. Hover brightens text and adds a faint panel fill.
- **Subject:** accent-tinted border and Frost Blue text, since subject tags are the ones worth following.
- **Status:** warning-tinted border and warning text, uppercase.
- **WIP:** the status chip plus hazard tape: diagonal warning stripes banded along the top and bottom edges, leaving a clear channel for the label, with a warning glyph.

### Badges (sidebar)

Mono labels. Quiet at rest (no fill, variant border at 50%, soft text), full variant colors on the hovered or current row. They align to one shared column at the row's end.

### Navigation

- **Header:** chrome glass over a faint Cobalt wash from the leading edge, closed by a blue-to-violet hairline that doubles as the reading-progress bar (a 2px gradient fill revealed by clip-path). The wordmark is the gradient-filled site title; hover sweeps a highlight band across it and blooms a split blue and violet glow.
- **Section nav:** medium-weight small labels in soft text; hover and current go bright, and the current section gets a 2px brand-gradient underline.
- **Sidebar rows:** small corners. Hover is a light gradient wash (`--ltk-nav-hover`); current is a stronger wash (`--ltk-nav-current`) with semibold bright text. Nested lists have indent guides that turn accent at the current page. Top-level sections carry masked Phosphor icons at 70% opacity, full on hover. The Manager and Editor sections use the full-color logo instead.
- **Group expand and collapse** animates height and opacity (0.2s), armed only after first paint so groups don't animate shut on every navigation.

### Where box (signature)

A compact definition list under the lead sentence of an Editor page: **Where** (the UI path in bold segments), **Shortcut** (keycaps), **Files**. Panel fill, line border, large corners, small type with muted terms and bright values.

### Screenshots (signature)

Real captures, served as-is. Annotated screenshots overlay numbered Cobalt pill markers with a white ring, theme-invariant because captures are always dark-theme. A missing capture renders a dashed placeholder naming the expected file path.

### Inline code and keys

Inline code is a pill with a line-step border and small corners (the border takes the aside color inside asides). Keys are one `<kbd>` per key: mono, 0.85em, a 2px bottom border.

## Do's and Don'ts

### Do:

- **Do** take every color and font weight from a token (`--sl-color-*`, `--ltk-*`) or a `color-mix()` of tokens.
- **Do** spend the Cobalt to Violet ramp on edges, rings, underlines, current state, and the one primary action per surface.
- **Do** keep surfaces quiet at rest (neutral border, muted glyph) and let hover or current state bring the accent in.
- **Do** check every visual change in both themes and at mobile width.
- **Do** disable transform-based motion in a component's own `prefers-reduced-motion` block, on top of the global duration override.
- **Do** apply Phosphor icons as CSS masks so they inherit color and state; inline SVG only for a component's own structural glyph, such as the trailing arrow.
- **Do** keep Starlight overrides unlayered instead of reaching for `!important`.

### Don't:

- **Don't** use gamer RGB styling: neon glows, aggressive angles, esports-overlay chrome.
- **Don't** imitate the League client or Riot's official branding (gold and teal client chrome, Riot marks).
- **Don't** ship stock Starlight with only the accent swapped; new surfaces get the site's own treatments (glass chrome, gradient hairlines, card rings).
- **Don't** use SaaS marketing tropes: gradient hero blobs, feature grids, testimonial carousels.
- **Don't** put a supporting graphic beside the hero headline; the cards below it are the real entry points.
- **Don't** use Bricolage Grotesque for content headings or body text.
- **Don't** fill large areas with the brand gradient or use it as prose text color.
- **Don't** use pill radii for rectangular containers; pills are for round-by-nature shapes only.
