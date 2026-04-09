---
title: Layers
description: Understanding the layer system in the Creator Workshop for composing and organizing mod changes into discrete, stackable units.
---

Layers let you split a mod into separate, toggleable content groups. Users can choose which layers to enable, giving them control over what parts of a mod are active.

## Concepts

Every mod has at least one layer (usually called "base"). Additional layers are optional and represent variations or add-ons.

### Priority

Each layer has a priority number. When multiple layers modify the same file, the layer with the **higher priority** wins. This determines which content takes precedence.

### String Overrides

Layers can include string overrides — key-value pairs that replace in-game text. This is useful for:

- Translating ability descriptions
- Renaming items or spells
- Adding custom flavor text

String overrides are layer-specific, so different layers can provide different text.

## Common Layer Patterns

### Base + Optional Extras

```
base (priority: 0)       — Core skin files
high-res (priority: 1)   — High-resolution textures
particles (priority: 1)  — Custom particle effects
```

Users get the base skin by default and can opt into high-res textures or custom particles.

### Multiple Variants

```
base (priority: 0)       — Shared files
variant-a (priority: 1)  — Color variant A
variant-b (priority: 1)  — Color variant B
```

Users pick one variant. Since both have the same priority and modify the same files, only one should be active at a time.

## Managing Layers

In the project editor:

- **Create** — Add a new layer with a name and optional description
- **Reorder** — Drag layers to change their priority order
- **Edit** — Update the layer's description
- **Delete** — Remove a layer and its content directory

## Layer Content Directory

Each layer maps to a directory under `content/` in the project:

```
my-mod/
├── mod.config.json
└── content/
    ├── base/
    │   └── DATA/
    │       └── Characters/
    │           └── Ahri/
    │               └── Skins/
    │                   └── ...
    └── high-res/
        └── DATA/
            └── Characters/
                └── Ahri/
                    └── Skins/
                        └── ...
```

Place your mod files in the appropriate layer directory using the game's file path structure.
