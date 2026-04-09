---
title: Configuration
description: How to configure ltk-manager settings and preferences, including game directory paths, update behavior, and theme customization.
---

Access settings from the **Settings** page via the navigation sidebar.

## Paths

### League Path

The path to your League of Legends installation directory. LTK Manager validates this by checking for `Game/League of Legends.exe`.

- Click **Auto-Detect** to let LTK Manager find your installation automatically
- Click **Browse** to select the directory manually

### Mod Storage Path

Where LTK Manager stores installed mods. Defaults to the app data directory. Change this if you want mods on a different drive or in a specific location.

### Workshop Path

The directory containing your mod projects. Set this to use the [Creator Workshop](/guides/mod-creation/workshop-overview/).

## Appearance

### Theme

- **System** (default) — Follows your OS dark/light mode preference
- **Dark** — Always dark
- **Light** — Always light

### Accent Color

Choose from preset colors or set a custom hue:

- **Presets:** Blue, Purple, Green, Orange, Pink, Red, Teal
- **Custom:** Set any hue value (0–360) for a custom accent color

### Backdrop Image

Set an optional background image for the app window. Configure the blur amount (0–100px) to control how the image appears behind content.

### Library View Mode

Choose the default view for the mod library:

- **Grid** — Card layout with thumbnails
- **List** — Compact list view

## Patching

### Patch TFT

When enabled, the patcher also includes Teamfight Tactics game files in the overlay. Disabled by default since most mods only target Summoner's Rift.

## Data Locations

Settings and data are stored in the app data directory:

| Platform | Path |
|----------|------|
| Windows | `%APPDATA%\dev.leaguetoolkit.manager\` |
| Linux | `~/.local/share/dev.leaguetoolkit.manager/` |

### Files

- `settings.json` — App settings
- `logs/` — Application log files (auto-rotated, 7-day retention)
