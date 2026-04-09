---
title: Troubleshooting
description: Solutions to common issues encountered when installing or managing mods with ltk-manager.
---

Common issues and how to resolve them.

## Log Files

LTK Manager writes logs that are helpful for diagnosing issues.

| Platform | Location |
|----------|----------|
| Windows | `%APPDATA%\dev.leaguetoolkit.manager\logs\ltk-manager.log` |
| Linux | `~/.local/share/dev.leaguetoolkit.manager/logs/ltk-manager.log` |

Logs are rotated daily and automatically cleaned up after 7 days.

For verbose logging during development, set the `RUST_LOG` environment variable:

```bash
RUST_LOG=ltk_manager=trace,tauri=info
```

## Common Issues

### "League of Legends not found"

**Cause:** LTK Manager can't locate your League installation.

**Fix:**
1. Go to **Settings**
2. Try **Auto-Detect** first
3. If that fails, click **Browse** and navigate to your League directory
4. The directory should contain `Game/League of Legends.exe`

### Mods not appearing in-game

**Possible causes:**
- Mods are installed but not **enabled** — check the toggle on each mod
- Patcher is not running — click **Patch** in the status bar
- Patcher was started **before** enabling the mod — stop and re-patch
- Mod targets different game files than expected

### Patcher fails to start

**Possible causes:**
- League path is incorrect or League was uninstalled
- Another instance of the patcher is already running
- Insufficient permissions — try running as administrator

**Check the log file** for specific error messages.

### "Workshop not configured"

**Cause:** No workshop path is set.

**Fix:** Go to **Settings** and set the **Workshop Path** to a directory where you want to store mod projects.

### Project import fails

**Possible causes:**
- **.modpkg/.fantome:** File is corrupted or uses an unsupported format version
- **Git import:** Repository URL is invalid or inaccessible
- **Name conflict:** A project with the same name already exists in the workshop

### Patcher is slow to build

The overlay building step processes all enabled mod files. Build time depends on:

- Number of enabled mods
- Total size of mod files
- Number of WAD archives to process

The first build is usually the slowest.

### App won't start

- Check if another instance is already running
- Try deleting `settings.json` to reset to defaults (you'll need to reconfigure paths)
- Check the log file for startup errors

## Getting Help

If your issue isn't listed here:

1. Check the [GitHub Issues](https://github.com/LeagueToolkit/ltk-manager/issues) for known problems
2. Open a new issue with:
   - A description of the problem
   - Steps to reproduce
   - Your log file contents
   - LTK Manager version (shown in the title bar)
