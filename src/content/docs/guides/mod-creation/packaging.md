---
title: Packaging
description: How to package completed mods for distribution, including export formats, versioning, and sharing with other ltk-manager users.
---

This page documents the `.modpkg` and `.fantome` mod package formats used by the LeagueToolkit ecosystem.

## modpkg

The `.modpkg` format is the modern, recommended format for distributing League of Legends mods.

### Structure

A modpkg file is a binary archive containing:

- **Metadata** — Mod name, version, authors, description, tags, champions, maps
- **Thumbnail** — Optional preview image (webp or png)
- **Layers** — One or more content layers, each containing game files
- **Configuration** — Layer priorities, string overrides, and other settings

### Advantages

- Full metadata support (authors with roles, tags, champions, maps)
- Multi-layer support with configurable priorities
- Thumbnail embedding
- String override support per layer
- Efficient binary format

## fantome

The `.fantome` format is a legacy format used by older mod tools. LTK Manager supports fantome files for backwards compatibility.

### Behavior on Install

When you install a `.fantome` file, LTK Manager:

1. Extracts the archive contents
2. Parses the WAD file structure
3. Converts the content to the internal mod format
4. Stores it as a standard mod in the library

### Limitations

Compared to modpkg, fantome files:

- Have limited metadata support
- Don't support multiple layers natively
- Don't include author roles or detailed categorization
- Don't support string overrides

## Choosing a Format

- **For new mods:** Use `.modpkg` — it supports all features and is the standard going forward
- **For compatibility with older tools:** Export as `.fantome` when sharing with users who haven't migrated yet

Both formats can be created using the [Creator Workshop](/guides/mod-creation/workshop-overview/) pack feature.
