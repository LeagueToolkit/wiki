import { defineConfig, fontProviders } from 'astro/config';
import starlight from '@astrojs/starlight';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://wiki.leaguetoolkit.dev',
  output: 'static',

  server: { port: 5850 },

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
      },
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Overview', slug: 'start-here' },
            { label: 'What is LeagueToolkit?', slug: 'start-here/what-is-leaguetoolkit' },
            { label: 'How Modding Works', slug: 'start-here/how-modding-works' },
            { label: 'Install LTK Manager', slug: 'start-here/install' },
            { label: 'Your First Mod', slug: 'start-here/first-mod' },
            { label: 'Where to Find Mods', slug: 'start-here/finding-mods' },
            { label: 'FAQ & Safety', slug: 'start-here/faq' },
            { label: 'Migrating from cslol', slug: 'start-here/from-cslol' },
          ],
        },
        {
          label: 'Mod Management',
          items: [
            { label: 'Overview', slug: 'mod-management' },
            { label: 'Managing Your Library', slug: 'mod-management/library' },
            { label: 'Profiles', slug: 'mod-management/profiles' },
            { label: 'Mod Folders', slug: 'mod-management/folders' },
            { label: 'Updating After a Patch', slug: 'mod-management/patch-updates' },
            { label: 'Troubleshooting', slug: 'mod-management/troubleshooting' },
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
              label: 'LTK Manager',
              collapsed: true,
              badge: { text: 'App', variant: 'tip' },
              items: [
                { label: 'Overview', slug: 'tools/ltk-manager/overview' },
                { label: 'Features', slug: 'tools/ltk-manager/features' },
                { label: 'Configuration', slug: 'tools/ltk-manager/configuration' },
              ],
            },
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
              items: [{ label: 'Fantome', slug: 'reference/mod-packages/fantome' }],
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
      ],
    }),
    svelte(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
