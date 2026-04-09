---
title: Building from Source
description: Set up a development environment and build LeagueToolkit projects from source.
---

Instructions for setting up the development environment and building LTK Manager.

## Prerequisites

- **Rust** — Latest stable toolchain ([rustup.rs](https://rustup.rs/))
- **Node.js** — v18 or later
- **pnpm** — Package manager ([pnpm.io](https://pnpm.io/))
- **Tauri prerequisites** — See [Tauri v2 prerequisites](https://v2.tauri.app/start/prerequisites/)

### Windows-Specific

- Visual Studio Build Tools with C++ workload
- WebView2 runtime (usually pre-installed on Windows 10/11)

## Setup

```bash
# Clone the repository
git clone https://github.com/LeagueToolkit/ltk-manager.git
cd ltk-manager

# Install frontend dependencies
pnpm install
```

## Development

```bash
# Full dev mode (Rust backend + React frontend with hot reload)
pnpm tauri dev

# Frontend only (skip Rust rebuild, faster UI iteration)
pnpm dev
```

### Useful Commands

```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Format
pnpm format

# All checks at once
pnpm check

# Rust checks
cargo clippy -p ltk-manager
cargo fmt -p ltk-manager
```

### Verbose Logging

```bash
RUST_LOG=ltk_manager=trace,tauri=info pnpm tauri dev
```

## Production Build

```bash
pnpm tauri build
```

This creates an installer in `src-tauri/target/release/bundle/`.

## Architecture Overview

See [Architecture](/guides/contributing/architecture/) for details on the codebase structure.
