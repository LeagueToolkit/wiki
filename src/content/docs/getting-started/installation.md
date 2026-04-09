---
title: Installation
description: Install and set up ltk-manager for League of Legends modding.
---

This guide walks you through installing LTK Manager and applying your first mod.

## Requirements

- Windows 10 or later
- League of Legends installed
- Mods in `.modpkg` or `.fantome` format

## Installation

1. Download the latest release from the [GitHub Releases](https://github.com/LeagueToolkit/ltk-manager/releases) page
2. Run the installer
3. Launch LTK Manager

## First-Time Setup

On first launch, LTK Manager will ask you to configure a few things:

### League Path

LTK Manager attempts to auto-detect your League of Legends installation. If detection fails, click **Browse** and navigate to your League folder (the one containing `Game/League of Legends.exe`).

Common install locations:
- `C:\Riot Games\League of Legends`
- `D:\Riot Games\League of Legends`

### Mod Storage Path

Choose where LTK Manager stores installed mods. The default location is in your app data directory. You can change this later in [Settings](/tools/ltk-manager/configuration/).

## Installing Your First Mod

There are two ways to install mods:

### Drag and Drop

Drag a `.modpkg` or `.fantome` file directly into the LTK Manager window. You can drop multiple files at once for bulk installation.

### File Browser

1. Click the **Install** button in the library toolbar
2. Select one or more mod files
3. Confirm the installation

Installed mods appear in your library and are automatically enabled.

## Applying Mods

Once you have mods installed and enabled:

1. Click the **Patch** button in the status bar
2. Wait for the overlay to build (this combines your enabled mods)
3. The patcher will apply the overlay to League
4. Launch League of Legends — your mods are active

To remove mods from the game, click **Stop** on the patcher.

## Next Steps

- [Managing Mods](/guides/mod-management/installing-mods/) — Enable, disable, reorder, and uninstall mods
- [Profiles](/guides/mod-management/profiles/) — Create mod profiles to quickly switch configurations
- [Settings](/tools/ltk-manager/configuration/) — Customize LTK Manager
- [Workshop Overview](/guides/mod-creation/workshop-overview/) — Start creating your own mods
