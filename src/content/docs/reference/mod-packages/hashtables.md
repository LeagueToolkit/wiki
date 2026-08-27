---
title: Embedded Hashtables
description: Standard for embedded hashtables in mod packages and projects - the table file format, the manifest schema, hash categories, and algorithms.
tags:
  type: reference
  audience: [tool-developer, mod-creator]
  subject: [hashing, fantome, mod-project]
---

Embedded hashtables let a mod package carry the names of its own files, so the custom paths a mod introduces survive packing, sharing, and extraction. This page is the standard: the table file format, the manifest that declares the tables, and how each container - fantome packages, mod projects, and modpkg - stores them.

:::note[Adoption]
Since patch 16.17, LTK Manager uses this as the official standard for embedded hashtables in mod archives. Implementation across the rest of the ecosystem is tracked in [league-mod#200](https://github.com/LeagueToolkit/league-mod/issues/200).
:::

## Motivation

Game patch 16.17 [retyped over 300 properties](https://meta-wiki.leaguetoolkit.dev/changelog/16-17/) in the meta system from `String` to `File`. A `File` value is the xxh64 hash of the file path it references, and before the patch those paths sat in `.bin` files as plain text. Now shipped data holds only hashes.

The game's own files lose nothing - every converted value maps back to a known path. Mods aren't so lucky. A mod's custom paths lived only in its `.bin` properties and in source `.rito` files the author often no longer has, so anyone extracting the mod today gets files named by hash, with no way back to the original names. Packed `.wad.client` archives always had this problem - scanning the mod's bins used to recover the paths, and 16.17 closed that door.

The fix is for the package to carry its own names: a small, machine-readable table of every path and string the mod introduces, traveling next to the content it names.

## Overview

The standard has two parts:

- **Hashtable files** - plain-text files that list names, one per line, with no hash column. One file per hash category.
- **A manifest** - entries in the package or project metadata, each declaring one table's location, category, hash algorithm, and key width.

The same manifest appears in three containers:

| Container   | Manifest location                       | Table location convention           |
| ----------- | --------------------------------------- | ----------------------------------- |
| `.fantome`  | `Hashtables` field in `META/info.json`  | `META/hashes/{category}.hashes.txt` |
| Mod project | `hashtables` field in `mod.config.json` | `hashes/{category}.hashes.txt`      |
| `.modpkg`   | Package metadata                        | Same logical schema                 |

Tools use the tables wherever a hash needs to become a name again: extracting content, displaying `File` and `Hash` property values, or contributing names upstream.

## Hashtable Files

### Grammar

A hashtable file is as simple as it sounds: every non-empty line is one name, verbatim. There is no comment syntax, no escaping, and no leading hex hash.

- **Encoding**: printable ASCII only (bytes `0x20`-`0x7E`), which is automatically valid UTF-8. No byte order mark, and readers are free to reject a file with anything outside that range.
- **Line endings**: write LF. Readers should accept CRLF too.
- **Path separators**: forward slash only. A backslash makes the name invalid - readers don't normalize it away.

```txt
assets/characters/aurora/skins/skin42/particles/aurora_skin42_custom_trail.tex
data/characters/aurora/skins/custom_voidborn.bin
```

### Hash Computation

The files store no hashes - tools compute them on demand. That is a feature: a name-only file can't contradict itself, because there is no stored hex value to drift out of sync with the name. And any tool that resolves hashes already ships the hash functions, so the computation is free.

The hash input is the name after canonicalization:

1. ASCII-lowercase the name (`A`-`Z` to `a`-`z`, nothing else - never locale-dependent Unicode lowercasing).
2. Hash the resulting bytes with the algorithm the manifest entry declares.
3. Truncate to the declared key width: `key = hash & ((1 << bits) - 1)`.

Names keep their display casing in the file. Two names that differ only by case canonicalize identically, so they count as duplicates.

### Duplicates and Collisions

Both rules work on the truncated key, per category, across all of the category's tables after [merging](#multiple-tables-per-category):

- **Duplicates** - the same canonical name twice. Writers must not emit them. Readers keep the first occurrence.
- **Collisions** - different canonical names with the same truncated key. This is a packing error: the writer must refuse to produce the package. A reader that runs into one anyway keeps the first occurrence and should warn.

### Scope

A table carries the mod's delta, not the world's knowledge:

- Include every name the mod introduces, plus any name it references that the community hashtables are missing.
- Don't embed the CommunityDragon lists. They are megabytes, they go stale, and every tool already has them.

Deduplicate against the community hashtables at pack time. This is a should, not a must - the lists grow, and a name that reaches them later must not retroactively invalidate an archive that already shipped it. Validators treat the overlap as a warning, nothing more.

Sorting is a preference, not a rule. We recommend sorting tables in lexicographic byte order (case-sensitive, the order of `LC_ALL=C sort`) because it keeps version-control diffs clean in projects - but an unsorted table is not a problem, and validators don't warn about it. Packers can emit lines in any order.

## The Manifest

Each manifest entry declares one hashtable file. All four fields are required.

| Field       | Type    | Description                                                           |
| ----------- | ------- | --------------------------------------------------------------------- |
| `Path`      | string  | Where the table file lives, relative to the container root.           |
| `Category`  | string  | The lookup domain of the names. See [Categories](#categories).        |
| `Algorithm` | string  | Hash function identifier. See [Algorithms](#algorithms).              |
| `Bits`      | integer | Stored key width in bits. Between 1 and the algorithm's native width. |

`Bits` is declared explicitly instead of derived from the algorithm, because the game may someday truncate a hash domain and keep only the lower bits. A declared width lets existing tools handle that without a registry update.

The manifest is authoritative: tools don't auto-discover tables from file names alone. That kind of leniency is how fantome metadata came to diverge between tools in the first place.

### Multiple Tables per Category

A manifest can declare any number of tables, and several can share one category. Merging is simple concatenation: tables in manifest order, lines in file order, first occurrence of a truncated key wins.

The `{category}.hashes.txt` name is a convention, not a requirement. A writer emitting several tables for one category can add a qualifier (`game.imported.hashes.txt`).

### Unknown Categories and Algorithms

The category registry is open. A reader that doesn't recognize an entry's category ignores that entry. One that doesn't recognize the algorithm can't compute keys, and skips the table. Either way, a tool that rewrites or repacks a container must preserve the entry and its file untouched - unknown is not the same as disposable.

## Categories

| Category     | Algorithm  | Bits | Names it holds                                           |
| ------------ | ---------- | ---- | -------------------------------------------------------- |
| `game`       | `xxh64`    | 64   | WAD chunk paths, and `File` property values.             |
| `binentries` | `fnv1a_32` | 32   | BIN object path names (entries).                         |
| `binhashes`  | `fnv1a_32` | 32   | FNV-1a string hashes that appear as `Hash`-typed values. |

The table shows each category's current algorithm and width - the manifest entry still declares both explicitly.

`game` deliberately serves two lookups. A `File` property value is the xxh64 hash of a path in the same hash space as [WAD chunk](/reference/file-formats/wad/) identification, so one table resolves both a chunk in a WAD and a `File` reference in a bin.

There are no `binfields` or `bintypes` categories on purpose. Field and type names come from the game's [metaclass definitions](/reference/metaclasses/overview/) - a mod can't mint ones the game would read. The registry is open if that ever changes.

## Algorithms

Identifiers are opaque lowercase strings. The width in `fnv1a_32` names the parameter set, not truncation - `Bits` alone expresses truncation. Full parameters live on the [Hashing Algorithms](/reference/hashing/algorithms/) page.

| Identifier | Function | Parameters                                    | Native width |
| ---------- | -------- | --------------------------------------------- | ------------ |
| `xxh3`     | XXH3-64  | Seed 0, default secret                        | 64           |
| `xxh64`    | xxHash64 | Seed 0                                        | 64           |
| `fnv1a_32` | FNV-1a   | Offset basis `0x811c9dc5`, prime `0x01000193` | 32           |

If a 128-bit XXH3 is ever needed, it gets a new identifier (`xxh3_128`), not `Bits: 128`.

### Hex Rendering

Wherever a truncated key appears as text - a hash-named file on disk, a hex fallback in [ritobin](/reference/file-formats/ritobin/) output, a diagnostic - render it as lowercase hex, zero-padded to `ceil(bits / 4)` digits. `Bits: 64` renders as 16 digits, `Bits: 32` as 8, and a width that isn't a multiple of 4 zero-pads the unused bits of its top digit.

## Fantome Packaging

`Hashtables` joins the [LeagueToolkit extension](/reference/mod-packages/fantome/#the-leaguetoolkit-extension) of `info.json`: optional, omitted when empty, and invisible to tools that predate it. Table files live under `META/hashes/`, and `Path` is relative to the archive root.

```json
{
  "Name": "Old Summoners Rift",
  "Author": "TheKillerey, Crauzer",
  "Version": "1.0.0",
  "Description": "Brings back the classic Summoners Rift map",
  "Hashtables": [
    { "Path": "META/hashes/game.hashes.txt", "Category": "game", "Algorithm": "xxh64", "Bits": 64 },
    {
      "Path": "META/hashes/binentries.hashes.txt",
      "Category": "binentries",
      "Algorithm": "fnv1a_32",
      "Bits": 32
    }
  ]
}
```

The tables help [WAD directories](/reference/mod-packages/fantome/#wad-directories-recommended) too, not just packed-WAD recovery. A WAD directory can already contain hash-named files - imported from a legacy packed WAD, or holding a path no Windows filesystem accepts - and the table makes those files nameable without making their paths representable.

## Mod Projects

The [project manifest](/making-mods/mod-projects/#the-manifest) declares the same entries, with the manifest's lowercase field names. `path` is relative to the project root.

```json
{
  "hashtables": [
    { "path": "hashes/game.hashes.txt", "category": "game", "algorithm": "xxh64", "bits": 64 }
  ]
}
```

Tables live outside `content/` - `hashes/` at the project root is the convention - so they are never packing candidates and never interact with `.modignore`. A fantome build copies them into `META/hashes/`, a modpkg build embeds them in package metadata, and an import recovers them into `hashes/`. The manifest is package-level, not per-layer: hash spaces are global, and fantome is single-layer regardless.

### The Extraction Escape Hatch

Some real paths simply cannot exist on disk:

- longer than the Windows path limit
- a reserved device name (`CON`, `NUL`, `COM1`)
- a trailing dot or space
- an extensionless file that clashes with a sibling directory of the same name
- a case-only clash with a sibling

When an extractor hits one of these, it neither fails nor mangles the path. It writes the file at the WAD root - the established location for unresolved chunks - named by the truncated key in [fixed-width hex](#hex-rendering), and appends the real path to the project's `game` table. The path survives. The disk name is just a placeholder.

The packer applies the reverse rule: a file at the WAD root whose name is exactly the right number of hex digits for the category is a raw hash. Packed output is byte-identical whether or not the table resolves the name - resolution only affects what tools display and what the table preserves for the next person.

Recorded paths also give project tooling something to check. A diagnostics pass can flag a table entry whose key matches no file in the project and no reference in its bins, or a hash-named file with no table entry - both are signs the name data is drifting from the content.

## Modpkg

Modpkg stores the same logical manifest - category, algorithm, and bits - in its package metadata, and each hashtable becomes its own zstd-compressed chunk. The payload is the same plain-text format described above, and compression keeps even a large table cheap.

Modpkg also relaxes the [scope rule](#scope) for the `game` table: a package can store only the filesystem-unrepresentable paths, because every other chunk's real path can be deduced from the paths the package already stores.

The round trip still holds. Project to modpkg to project loses no names, because a trimmed table plus the stored paths recovers all of them, and modpkg to fantome emits the `META/hashes/` layout above.

## Rules at a Glance

For tools that write packages:

- Emit printable-ASCII, LF, name-only tables with forward slashes and no BOM.
- Declare every table in the manifest, with all four fields.
- Never emit duplicate canonical names, and fail the pack on a truncated-key collision within a category.
- Ship only names the community hashtables don't have, checked at pack time.

For tools that read them:

- Compute keys as ASCII-lowercase, then hash, then truncate to `bits`.
- Take the first occurrence of a key across a category's merged tables.
- Ignore entries with unknown categories, skip tables with unknown algorithms, and preserve both when rewriting.
- Don't auto-discover tables the manifest doesn't declare.

## Open Questions

- **Editor ownership.** Should the Project Editor treat table files as user-editable text it merges with, or own them and regenerate on save? Either way, naming a previously unknown file in the editor should be exactly "append a line".

## Related Pages

- [Fantome Package](/reference/mod-packages/fantome/) - the archive layout and the extension the manifest joins
- [Hashing Algorithms](/reference/hashing/algorithms/) - full parameters for FNV-1a and xxHash64
- [Mod Projects](/making-mods/mod-projects/) - the project layout and manifest the tables live in
- [WAD Archives](/reference/file-formats/wad/) - the chunk format the `game` category resolves
- [Packaging](/making-mods/packaging/) - choosing between `.fantome` and `.modpkg`
