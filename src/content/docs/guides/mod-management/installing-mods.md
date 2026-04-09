---
title: Installing Mods
description: Learn how to find, download, and install mods for League of Legends using ltk-manager.
---

The mod library is the main screen of LTK Manager. It shows all your installed mods and provides tools to organize them.

## Library Views

Switch between **Grid** and **List** view using the view toggle in the toolbar. Your preference is saved automatically.

- **Grid view** — Shows mod thumbnails in a card layout
- **List view** — Compact list with mod details

## Installing Mods

### Drag and Drop

Drag `.modpkg` or `.fantome` files directly into the LTK Manager window. Multiple files can be dropped at once.

### File Browser

Click the **Install** button in the toolbar to open a file picker. Select one or more mod files to install.

### Supported Formats

- **`.modpkg`** — Modern mod package format (recommended)
- **`.fantome`** — Legacy format (automatically converted to modpkg on install)

## Enabling and Disabling Mods

Toggle a mod on or off using the switch on its card. Disabled mods remain installed but are not included when patching.

Mod enable/disable state is per-profile — see [Profiles](/guides/mod-management/profiles/) for details.

## Mod Load Order

When multiple mods modify the same game files, load order determines which mod takes priority. Mods higher in the list have higher priority.

To reorder mods, drag them to the desired position in the library.

## Searching and Filtering

Use the search bar to filter mods by name, author, or description. Additional filters are available for:

- **Tags** — Categorization tags set by mod authors
- **Champions** — Filter by affected champion
- **Maps** — Filter by affected map

## Mod Details

Click a mod to view its details:

- Display name, version, and description
- Authors
- Layers and their status
- Tags, champions, and maps
- File size
- Installation date

## Layers

Some mods include multiple layers (e.g., "base", "high-res", "alternate skin"). Each layer can be individually enabled or disabled, giving you control over which parts of a mod are active.

## Uninstalling Mods

To remove a mod, right-click it and select **Uninstall**, or use the uninstall button in the mod details. This permanently removes the mod from your library and all profiles.

## Inspecting Mods Before Installing

You can preview a mod's metadata before installing it by using the inspect feature. This shows the mod's name, version, authors, description, and layers without adding it to your library.
