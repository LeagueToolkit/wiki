# CLAUDE.md - LTK Wiki

Engineering conventions for the **code** in this repo (the Astro site, its
components, and its styles). For writing rules that apply to prose, commits, and
docs content, see [AGENTS.md](./AGENTS.md) - different audience, different rules.

LTK Wiki is the documentation site for the LeagueToolkit ecosystem: guides and
reference material for League of Legends modding tools (ltk-manager,
league-toolkit, lol-meta-classes). Astro + Starlight, statically generated,
deployed to Cloudflare.

## Quick reference

```bash
pnpm install          # dependencies
pnpm dev              # dev server
pnpm build            # static build (must pass before you call work done)
pnpm preview          # build + wrangler dev
pnpm astro check      # type check
pnpm lint             # eslint
pnpm format           # prettier --write
```

Node >= 20 LTS, pnpm, TypeScript strict mode. Build output is static HTML/CSS/JS.

---

## Layout in one breath

- `src/content/docs/**` - every page, as `.md`/`.mdx`. This is the **content**;
  it is the reason the repo exists.
- `astro.config.ts` - Starlight config: sidebar tree, redirects, component
  overrides, custom CSS. Navigation is declared here, not in content.
- `src/components/*.astro|.svelte` - components MDX pages import.
- `src/components/starlight/` - overrides of Starlight's own components,
  registered in the `components` map in `astro.config.ts`.
- `src/styles/custom.css` - the site theme and every cross-component rule.
- `src/content.config.ts` - collection schemas (Zod), enforced at build time.

Content flows one way: `src/content/docs/*.mdx -> Starlight layout ->
components`. A component never reaches back into another page's frontmatter.

---

## Content vs code

1. **Page copy lives in content, not components.** A component reads its text
   from props or frontmatter so a writer can change wording without touching
   `.astro`. `src/components/starlight/Hero.astro` reads title, tagline, and
   actions from the page's `hero` frontmatter for exactly this reason.

2. **Navigation lives in `astro.config.ts`.** Don't build ad-hoc nav in content.
   The exception is the landing page's entry cards, which are a deliberate
   editorial surface.

3. **Prefer `.md` over `.mdx`.** Use MDX only when the page needs a component.
   Keep MDX logic to imports and props; anything longer belongs in a component.

---

## Component architecture

4. **`.astro` by default, `.svelte` only for interactivity.** If a component has
   no client-side state, it must be `.astro` and ship zero JS. Reach for Svelte
   when there is real interaction (`GlossarySearch`, `HashCalculator`,
   `VersionMatrix`).

5. **Choose the hydration directive deliberately.** `client:load` only for
   above-the-fold interactivity, `client:visible` for anything below it,
   `client:idle` for non-urgent work. An island that hydrates on load and is
   never scrolled to is wasted bandwidth.

6. **Page-entry components stay thin.** A component an MDX page imports reads its
   data, computes a little derived state, and delegates rendering. Past roughly
   150 lines of markup plus logic, split it into orchestrator -> section ->
   per-item card.

7. **Group a feature's leaf sub-components in a subdirectory**, as
   `components/starlight/` and `components/ui/tooltip/` already do. The
   page-entry component stays at `components/` root; its parts live in the
   subdirectory.

8. **One parameterized component beats near-duplicate ones.** `TopicCards.astro`
   renders both the "New to League modding?" and "Building tools?" grids from a
   `topics` array. If two blocks differ only by label, colour, or icon, unify
   them behind a prop.

9. **Replace repeated conditional branches with a keyed lookup.**
   `TopicCards.astro` picks its glyph from a static `icons` map rather than a
   branch per icon. Reach for a lookup object when you see parallel `if`s.

10. **Icons come from Phosphor (`@phosphor-icons/core`), applied as CSS masks.**
    A masked icon takes its container's `color` and hover state for free, so
    there is no second set of rules per state. Import the SVG (Vite resolves the
    URL at build time), pass it through a custom property, and mask it - see
    `TopicCards.astro` and the sidebar section icons in `custom.css`. Inline
    `<svg>` is acceptable only for a one-off glyph that is part of a component's
    own structure, such as the trailing arrow on a link.

---

## Props and types

11. **Every component declares `interface Props`.** Never destructure an untyped
    `Astro.props`. Export the types a page needs in order to build its props, as
    `TopicCards.astro` exports `Topic` and `TopicIcon`.

12. **No `any`.** Strict mode is on project-wide and the build fails on type
    errors. Unavoidable third-party gaps get a narrow local type, not an escape
    hatch.

13. **Pass structured data as an object, not a positional list of same-typed
    values.** Any function taking three or more arguments of the same type is a
    refactor target - the call site cannot show a transposition.

14. **Content shapes belong in `src/content.config.ts`.** Frontmatter is
    validated by Zod at build time; a component that reads frontmatter trusts
    that schema rather than re-checking fields.

---

## Styling

15. **Scope styles per component by default.** Astro hashes each `<style>` block
    to its component. "Sharing" means either sharing _values_ (tokens) or
    promoting a rule to the global stylesheet - pick by what you are actually
    sharing.

16. **Share values with design tokens, never copied hex.** Starlight's
    theme-aware palette (`--sl-color-*`) covers most needs. Site-specific values
    are `--ltk-*` tokens defined in `custom.css`: `--ltk-font-display`,
    `--ltk-wordmark`, `--ltk-nav-hover`, `--ltk-nav-current`, the brand pair
    (`--ltk-blue`, `--ltk-violet`, `--ltk-on-brand`), the status palette
    (`--ltk-success`, `--ltk-warning`, `--ltk-danger`, `--ltk-required`), the
    radius scale (`--ltk-radius-*`), the weight scale (`--ltk-weight-*`), and
    the glass scale (`--ltk-glass-*`: chrome/panel/scrim fill+blur pairs for
    frosted surfaces).
    **Colours and font weights in CSS are always a token reference, never a raw
    literal** - pick from the scales, or mint a token in the matching
    `custom.css` section when none fits. JS-side colour data (the Mermaid theme,
    BinaryStructure's categorical palette) is exempt: those are script config,
    not stylesheet rules. Leave incidental one-off sizes (`0.4rem`, `0.8125rem`)
    inline rather than minting a token per magic number.

17. **Cross-component rules go in `src/styles/custom.css`,** which Starlight
    loads via `customCss`. Keep its section banner comments and add to the right
    section rather than appending to the end.

18. **Rules that override Starlight must stay unlayered.** Starlight ships its
    own styles in `@layer starlight.core`, and an unlayered rule beats any
    layered one. That is why the sidebar and aside overrides in `custom.css`
    carry no `!important` - don't add one, check the layer first.

19. **Tailwind's preflight is the other half of that story.** Preflight lives in
    `@layer base` and resets list styles, so `custom.css` restores them with
    guards (`:not([class])`, `:not(:where(.not-content *))`) that keep component
    markup out of the blast radius. Read the comment above those rules before
    touching anything list-related.

20. **Style both themes.** Every colour decision needs a
    `:root[data-theme='light']` counterpart, or a `--sl-color-*` token that
    already inverts. Check both before calling a visual change done.

21. **Respect `prefers-reduced-motion`.** `custom.css` neutralises durations
    globally, but a component that animates transforms should also disable them
    in its own scoped block, as `PathCards.astro` does.

---

## Starlight overrides

22. **Override through the `components` map in `astro.config.ts`,** never by
    editing anything under `node_modules`. Current overrides: `Sidebar.astro`
    (makes a group with an Overview page navigate to it), `Hero.astro` (the
    splash hero), `Head.astro` (Fonts API `<Font>` tags), and `Header.astro`
    (reading-progress bar and the mobile hide-on-scroll script).

23. **Don't import Starlight internals.** Only the documented entry points are
    exported; a deep specifier like `@astrojs/starlight/constants` fails the
    build. Inline the value with a comment saying where it came from, as
    `Hero.astro` does for `PAGE_TITLE_ID`.

24. **Wrap, don't rewrite, when you only need to add behaviour.**
    `Sidebar.astro` renders Starlight's default component and layers a script on
    top rather than reimplementing the tree.

25. **Redirects in `astro.config.ts` are permanent.** The block mapping the
    pre-2026-07 URLs keeps links shared elsewhere working. Add to it when you
    move a page; never delete from it.

---

## Comments

26. **A comment says only what the code cannot.** Before writing one, check the
    code and the section doc above it: if the selector, condition, or an
    existing block already carries the rationale, write nothing. Never narrate
    current values ("at 65% the frost stays visible...") - they go stale on the
    next tweak.

27. **Structure multi-point comments as lists.** When a comment covers more
    than a couple of distinct points (tiers of a scale, reasons for a rule,
    steps of a behaviour), open with a one-line summary and put the points in a
    `-` or numbered list, as the Glass Surfaces block in `custom.css` does.
    Single-point comments stay plain sentences.

---

## Verify before you call it done

- `pnpm build` passes with no errors.
- `pnpm astro check` is clean for the files you touched.
- `pnpm lint` reports nothing new. It is not clean today: nine Svelte components
  carry pre-existing errors (missing `each` keys, non-null assertions). Don't add
  to that set, and don't treat a red exit code as permission to skip the check.
- `pnpm format` has been run, or the file matches `.prettierrc` (2-space, single
  quotes, 100 columns, trailing commas).
- Visual changes were looked at in both light and dark mode, and at mobile width.

---

## Related projects

| Project                                                               | Description                    | Relevance to wiki       |
| --------------------------------------------------------------------- | ------------------------------ | ----------------------- |
| [ltk-manager](https://github.com/LeagueToolkit/ltk-manager)           | Mod manager (Tauri + React)    | Primary tool documented |
| [league-toolkit](https://github.com/LeagueToolkit/league-toolkit)     | Rust file format library       | Format reference source |
| [lol-meta-classes](https://github.com/LeagueToolkit/lol-meta-classes) | Metaclass extraction toolchain | Data model reference    |

## SpecKit workflow

Structured feature development runs
`/specify -> /clarify -> /plan -> /tasks -> /analyze -> /implement`. Specs live
in `.specify/specs/{feature}/`; the constitution is at
`.specify/memory/constitution.md`.
