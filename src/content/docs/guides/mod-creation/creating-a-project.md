---
title: Creating a Project
description: How to start a new mod project in the Creator Workshop, including project setup, configuration, and initial structure.
---

The Workshop supports importing projects from several sources. This lets you start from existing mods instead of building from scratch.

## From .modpkg

Import an existing mod package as an editable project.

1. In the Workshop, click **Import** > **From modpkg**
2. Select a `.modpkg` file
3. The mod is extracted into your workshop directory as a project

The project inherits all metadata, layers, and content from the package.

## From .fantome

Import a legacy fantome archive. Since fantome files have limited metadata, you can preview and configure the import.

1. Click **Import** > **From Fantome**
2. Select a `.fantome` file
3. A preview dialog shows the archive contents
4. Configure project name and metadata
5. Click **Import**

The fantome's WAD contents are extracted and organized into the project's layer structure.

## From Git

Clone a Git repository containing a mod project.

1. Click **Import** > **From Git**
2. Enter the repository URL
3. Optionally specify a branch (defaults to the repo's default branch)
4. Click **Import**

The repository is cloned into your workshop directory. It must contain a `mod.config.json` or `mod.config.toml` at the root to be recognized as a project.

This is useful for collaborative mod development or importing projects hosted on GitHub.

## After Importing

Once imported, the project appears in your Workshop and can be edited, packed, and managed like any other project. You can modify metadata, add/remove layers, and pack it into a distributable format.
