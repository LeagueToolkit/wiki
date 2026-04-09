---
title: ltk-manager Overview
description: An introduction to ltk-manager, the desktop mod manager for League of Legends that streamlines mod installation, updates, and profile management.
---

LTK Manager is a desktop application for installing, managing, and creating League of Legends mods. Built with [Tauri](https://tauri.app/) (Rust backend + React frontend), it provides a fast, native experience on Windows.

## Features

- **Mod Library** — Install, browse, search, and manage mods with a grid or list view
- **Profiles** — Create multiple mod configurations and switch between them instantly
- **Patcher** — One-click patching to apply mods to League of Legends
- **Creator Workshop** — Build, edit, validate, and package mods
- **Import/Migration** — Import mods from `.modpkg`, `.fantome`, Git repos, or cslol-manager

## Pages

- [Getting Started](/getting-started/installation/)
- [Managing Mods](/guides/mod-management/installing-mods/)
- [Profiles](/guides/mod-management/profiles/)
- [Patching](/tools/ltk-manager/features/)
- [Workshop Overview](/guides/mod-creation/workshop-overview/)
- [Settings](/tools/ltk-manager/configuration/)
- [Migration from cslol-manager](/getting-started/migration/)
- [Troubleshooting](/guides/mod-management/troubleshooting/)

## Supported Mod Formats

| Format | Extension | Description |
|--------|-----------|-------------|
| modpkg | `.modpkg` | Modern format with full metadata, multi-layer support, and thumbnails |
| Fantome | `.fantome` | Legacy WAD-based format, auto-converted to modpkg on install |
