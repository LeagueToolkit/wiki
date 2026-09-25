import { defineConfig, fontProviders } from 'astro/config';
import starlight from '@astrojs/starlight';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://wiki.leaguetoolkit.dev',
  output: 'static',

  server: { port: 5850 },

  redirects: {
    '/mod-management': '/manager/',
    '/mod-management/library': '/manager/library/',
    '/mod-management/profiles': '/manager/library/profiles/',
    '/mod-management/folders': '/manager/library/folders/',
    '/mod-management/patch-updates': '/manager/patch-updates/',
    '/mod-management/troubleshooting': '/manager/troubleshooting/',
    '/start-here/install': '/manager/quick-start/',
    '/start-here/first-mod': '/manager/quick-start/',
    '/tools/ltk-manager/overview': '/manager/',
    '/tools/ltk-manager/features': '/manager/',
    '/tools/ltk-manager/configuration': '/manager/settings/',
  },

  // Self-hosted via the Fonts API: downloaded at build time, served from
  // /_astro/, with generated fallback metrics to soften the swap. The
  // cssVariable values are consumed by the font tokens in custom.css; the
  // matching <Font> tags render from the Head override component.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Geist',
      cssVariable: '--font-geist',
      weights: ['100 900'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: ['100 800'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-bricolage',
      weights: ['200 800'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],

  integrations: [
    starlight({
      title: 'LTK Wiki',
      logo: {
        src: './src/assets/logo.svg',
      },
      favicon: '/favicon.svg',
      description:
        'Documentation and knowledge base for the LeagueToolkit ecosystem - guides, tooling docs, and reference material for League of Legends modding.',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/LeagueToolkit',
        },
        {
          icon: 'discord',
          label: 'Discord',
          href: 'https://discord.gg/B36wgabjmD',
        },
      ],
      customCss: ['./src/styles/tailwind.css', './src/styles/custom.css'],
      components: {
        Sidebar: './src/components/starlight/Sidebar.astro',
        Hero: './src/components/starlight/Hero.astro',
        Header: './src/components/starlight/Header.astro',
        Head: './src/components/starlight/Head.astro',
        PageTitle: './src/components/starlight/PageTitle.astro',
      },
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Overview', slug: 'start-here' },
            { label: 'What is LeagueToolkit?', slug: 'start-here/what-is-leaguetoolkit' },
            { label: 'How Modding Works', slug: 'start-here/how-modding-works' },
            { label: 'Quick start', slug: 'manager/quick-start' },
            { label: 'Where to Find Mods', slug: 'start-here/finding-mods' },
            { label: 'FAQ & Safety', slug: 'start-here/faq' },
            { label: 'Migrating from cslol', slug: 'start-here/from-cslol' },
          ],
        },
        {
          label: 'LTK Manager',
          items: [
            { label: 'Overview', slug: 'manager' },
            { label: 'Quick start', slug: 'manager/quick-start' },
            { label: 'Home interface', slug: 'manager/home' },
            { label: 'Play with mods', slug: 'manager/play' },
            {
              label: 'Mod library',
              items: [
                { label: 'Mod library', slug: 'manager/library' },
                { label: 'Mods page interface', slug: 'manager/library/interface' },
                { label: 'Install mods', slug: 'manager/library/install-mods' },
                { label: 'Turn mods on and off', slug: 'manager/library/enable-mods' },
                { label: 'Select several mods', slug: 'manager/library/select-mods' },
                { label: 'Find a mod', slug: 'manager/library/find-mods' },
                { label: 'Change the load order', slug: 'manager/library/load-order' },
                { label: 'Organize mods into folders', slug: 'manager/library/folders' },
                { label: 'Manage profiles', slug: 'manager/library/profiles' },
                { label: 'View mod details', slug: 'manager/library/mod-details' },
                { label: 'Check and repair mods', slug: 'manager/library/mod-health' },
                { label: 'Export mods', slug: 'manager/library/export-mods' },
                { label: 'Uninstall mods', slug: 'manager/library/uninstall-mods' },
              ],
            },
            {
              label: 'Settings',
              collapsed: true,
              items: [
                {
                  label: 'Overview',
                  slug: 'manager/settings',
                  badge: { text: 'WIP', variant: 'caution' },
                },
                {
                  label: 'General',
                  slug: 'manager/settings/general',
                  badge: { text: 'WIP', variant: 'caution' },
                },
                {
                  label: 'Library',
                  slug: 'manager/settings/library',
                  badge: { text: 'WIP', variant: 'caution' },
                },
                {
                  label: 'Patching',
                  slug: 'manager/settings/patching',
                  badge: { text: 'WIP', variant: 'caution' },
                },
                {
                  label: 'Built-in mods',
                  slug: 'manager/settings/built-in-mods',
                },
                {
                  label: 'Appearance',
                  slug: 'manager/settings/appearance',
                  badge: { text: 'WIP', variant: 'caution' },
                },
                {
                  label: 'Hotkeys',
                  slug: 'manager/settings/hotkeys',
                  badge: { text: 'WIP', variant: 'caution' },
                },
                {
                  label: 'LTK Editor',
                  slug: 'manager/settings/editor',
                  badge: { text: 'WIP', variant: 'caution' },
                },
                {
                  label: 'Cache',
                  slug: 'manager/settings/cache',
                  badge: { text: 'WIP', variant: 'caution' },
                },
                {
                  label: 'About',
                  slug: 'manager/settings/about',
                  badge: { text: 'WIP', variant: 'caution' },
                },
              ],
            },
            {
              label: 'Diagnostics',
              slug: 'manager/diagnostics',
              badge: { text: 'WIP', variant: 'caution' },
            },
            {
              label: 'Update LTK Manager',
              slug: 'manager/update',
              badge: { text: 'WIP', variant: 'caution' },
            },
            { label: 'Updating after a patch', slug: 'manager/patch-updates' },
            { label: 'Troubleshooting', slug: 'manager/troubleshooting' },
            { label: 'Privacy', slug: 'manager/privacy' },
          ],
        },
        {
          label: 'LTK Editor',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'editor', badge: { text: 'WIP', variant: 'caution' } },
            {
              label: 'Create your first mod',
              slug: 'editor/quick-start',
              badge: { text: 'WIP', variant: 'caution' },
            },
            {
              label: 'Projects',
              slug: 'editor/projects',
              badge: { text: 'WIP', variant: 'caution' },
            },
            {
              label: 'LTK Editor interface',
              slug: 'editor/interface',
              badge: { text: 'WIP', variant: 'caution' },
            },
            {
              label: 'Problems',
              slug: 'editor/problems',
              badge: { text: 'WIP', variant: 'caution' },
            },
            {
              label: 'Editors',
              collapsed: true,
              items: [
                {
                  label: 'Bin editor',
                  slug: 'editor/bin-editor',
                  badge: { text: 'WIP', variant: 'caution' },
                },
                {
                  label: 'VFX editor',
                  slug: 'editor/vfx-editor',
                  badge: { text: 'WIP', variant: 'caution' },
                },
                {
                  label: 'Material editor',
                  slug: 'editor/material-editor',
                  badge: { text: 'WIP', variant: 'caution' },
                },
                {
                  label: 'Skin editor',
                  slug: 'editor/skin-editor',
                  badge: { text: 'WIP', variant: 'caution' },
                },
                {
                  label: 'Animation graph',
                  slug: 'editor/animation-graph',
                  badge: { text: 'WIP', variant: 'caution' },
                },
                {
                  label: 'Map viewer',
                  slug: 'editor/map-viewer',
                  badge: { text: 'WIP', variant: 'caution' },
                },
              ],
            },
            {
              label: 'Hexshade',
              slug: 'editor/hexshade',
              badge: { text: 'WIP', variant: 'caution' },
            },
            {
              label: 'Test a project',
              slug: 'editor/test-a-project',
              badge: { text: 'WIP', variant: 'caution' },
            },
            {
              label: 'Pack a project',
              slug: 'editor/pack-a-project',
              badge: { text: 'WIP', variant: 'caution' },
            },
          ],
        },
        {
          label: 'Mod Creation',
          items: [
            { label: 'Overview', slug: 'making-mods' },
            { label: 'Mod Projects', slug: 'making-mods/mod-projects' },
            { label: 'Workshop Overview', slug: 'making-mods/workshop' },
            { label: 'Creating a Project', slug: 'making-mods/project' },
            { label: 'Migrating to Projects', slug: 'making-mods/migrating' },
            { label: 'Layers', slug: 'making-mods/layers' },
            { label: 'String Overrides', slug: 'making-mods/string-overrides' },
            { label: 'Game Data Declarations', slug: 'making-mods/game-data' },
            { label: 'Packaging', slug: 'making-mods/packaging' },
            {
              label: 'From the Command Line',
              slug: 'making-mods/command-line',
              badge: { text: 'CLI', variant: 'note' },
            },
          ],
        },
        {
          label: 'Tools',
          collapsed: true,
          items: [
            { label: 'Overview', slug: 'tools' },
            {
              label: 'league-toolkit',
              collapsed: true,
              badge: { text: 'Library', variant: 'default' },
              items: [
                {
                  label: 'Overview',
                  slug: 'tools/league-toolkit/overview',
                  badge: { text: 'WIP', variant: 'caution' },
                },
                {
                  label: 'Crate Guide',
                  slug: 'tools/league-toolkit/crate-guide',
                  badge: { text: 'WIP', variant: 'caution' },
                },
              ],
            },
            {
              label: 'wadtools',
              collapsed: true,
              badge: { text: 'CLI', variant: 'note' },
              items: [{ label: 'Overview', slug: 'tools/wadtools/overview' }],
            },
            {
              label: 'ltk-tex-utils',
              slug: 'tools/ltk-tex-utils',
              badge: { text: 'CLI', variant: 'note' },
            },
            {
              label: 'ritobin-tools',
              slug: 'tools/ritobin-tools',
              badge: { text: 'CLI', variant: 'note' },
            },
            { label: 'Mimir', slug: 'tools/mimir', badge: { text: 'Data', variant: 'default' } },
            {
              label: 'lol-meta-classes',
              slug: 'tools/lol-meta-classes',
              badge: { text: 'Data', variant: 'default' },
            },
          ],
        },
        {
          label: 'Reference',
          collapsed: true,
          badge: { text: 'Advanced', variant: 'caution' },
          items: [
            {
              label: 'Mod Packages',
              collapsed: true,
              items: [
                { label: 'Fantome', slug: 'reference/mod-packages/fantome' },
                { label: 'Embedded Hashtables', slug: 'reference/mod-packages/hashtables' },
                { label: 'Game Data Declarations', slug: 'reference/mod-packages/game-data' },
              ],
            },
            {
              label: 'File Formats',
              collapsed: true,
              items: [
                { label: 'WAD Archives', slug: 'reference/file-formats/wad' },
                { label: 'SKN (Meshes)', slug: 'reference/file-formats/skn' },
                { label: 'SKL (Skeletons)', slug: 'reference/file-formats/skl' },
                { label: 'ANM (Animations)', slug: 'reference/file-formats/anm' },
                { label: 'BIN (Property Bins)', slug: 'reference/file-formats/bin' },
                { label: 'TEX (Textures)', slug: 'reference/file-formats/tex' },
                { label: 'MapGeo', slug: 'reference/file-formats/mapgeo' },
                { label: 'Ritobin', slug: 'reference/file-formats/ritobin' },
                { label: 'SCB/SCO (Static Meshes)', slug: 'reference/file-formats/scb-sco' },
                { label: 'WGEO (World Geometry)', slug: 'reference/file-formats/wgeo' },
                { label: 'Legacy Formats', slug: 'reference/file-formats/legacy' },
              ],
            },
            {
              label: 'Metaclasses',
              collapsed: true,
              items: [{ label: 'Overview', slug: 'reference/metaclasses/overview' }],
            },
            {
              label: 'Hashing',
              collapsed: true,
              items: [{ label: 'Algorithms', slug: 'reference/hashing/algorithms' }],
            },
          ],
        },
        {
          label: 'For Developers',
          collapsed: true,
          items: [{ label: 'Ecosystem Integration', slug: 'developers/ecosystem-integration' }],
        },
        {
          label: 'Contributing',
          collapsed: true,
          badge: { text: 'Devs', variant: 'note' },
          items: [
            { label: 'Wiki Authoring', slug: 'contributing/wiki-authoring' },
            { label: 'Project Guidelines', slug: 'contributing/project-guidelines' },
            { label: 'Building from Source', slug: 'contributing/building-from-source' },
            { label: 'Architecture', slug: 'contributing/architecture' },
          ],
        },
        {
          label: 'Community',
          collapsed: true,
          items: [{ label: 'Useful Links', slug: 'community/links' }],
        },
        { label: 'Glossary', slug: 'glossary' },
        { label: 'Tags', link: '/tags/' },
      ],
    }),
    svelte(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
