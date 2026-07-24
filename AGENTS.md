# Agent instructions

Read this before writing anything in this repo. It applies to Claude Code, Codex, Cursor, and any
other coding agent.

## Writing rules

Full guide: [LeagueToolkit AI styleguide](https://github.com/LeagueToolkit/.github/blob/main/AI-STYLEGUIDE.md).
The rules that get violated most, inlined so they apply even without network access:

- **No em dashes (U+2014).** Use a plain hyphen `-` for the parenthetical break. En dashes are
  fine in numeric ranges (2013–2024), just never as a sentence break.
- **No smart quotes, smart apostrophes, or the ellipsis character** - ASCII `'`, `"`, and `...`.
- **Emoji in markdown headings are fine used sparingly**, as a scanning anchor - one per heading,
  never on every heading, never as enthusiasm. None in code, commits, or PR titles.
- **Exclamation marks are fine** for real warnings. Not for manufactured excitement ("Happy
  hacking!").
- **No contrast clichés** ("it's not just X, it's Y"), **no rule-of-three padding** ("fast,
  reliable, and easy to use"), **no hollow openers** ("it's worth noting that", "let's dive in").
- **Judge vocabulary by substance, not by a blocklist.** Delve, leverage, seamless, robust,
  comprehensive, elevate, streamline, cutting-edge, bleeding-edge, plethora: any of these is
  filler when it stands in for a concrete claim, and fine when a concrete claim backs it.
  "Bleeding-edge updates whenever the League engine changes" passes; "a robust, seamless
  toolkit" does not. With nothing concrete behind the word, use the plain one.
- **Bold marks one term, not half the sentence.** Headings are navigation, not decoration.
- **Second person, present tense, active voice.** Concrete numbers or no claim at all.
- **Say what failed.** Report skipped steps and failing tests plainly; don't claim verification
  you didn't perform.

## Accuracy

This repo deals with reverse-engineered League of Legends file formats. Invented detail is the
worst failure mode available to you.

- **Never state an offset, field size, magic value, CLI flag, config key, or API signature you
  haven't read in this repo's source.** Model priors about League formats are not evidence.
- **Label guesses as guesses.** "Probably a flags field; observed values are 0 and 3."
- **Name unidentified fields `unknown_0x14`**, with a comment on observed values. A plausible
  wrong name propagates into every downstream tool.
- **Don't fabricate benchmarks, versions, dates, or names.**

## Code

- Match the surrounding code: naming, error handling, module layout, and comment density.
- Comment _why_, not _what_ - in a line or two. A comment that reads like a
  design-decision writeup gets cut, not kept.
- `cargo fmt --all -- --check`, `cargo clippy -- -D warnings`, and `cargo test` must pass before
  you call the work done.
- Add a test with every bug fix - one that fails before the change.

## Commits

- Conventional Commits, imperative, lowercase after the type, under ~72 chars, no trailing period:
  `fix: handle zero-length chunks when extracting`
- Body says why and what behavior changed. Not a file-by-file list.
- **No AI attribution trailers** unless a maintainer asks for one.
- Don't commit or push unless asked.

## Repo specifics

<!-- Replace with build commands, architecture notes, and gotchas for this repo. -->

{{TODO}}
