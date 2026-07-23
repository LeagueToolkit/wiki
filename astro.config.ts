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

  // Permanent redirects from the pre-2026-07 URL structure. The wiki was
  // reorganised audience-first (Start Here / Using Mods / Mod Creation); these
  // keep every previously-shared link working. Do not remove.
  redirects: {
    '/getting-started': '/start-here/',
    '/getting-started/introduction': '/start-here/what-is-leaguetoolkit/',
    '/getting-started/installation': '/start-here/install/',
    '/getting-started/first-mod': '/start-here/first-mod/',
    '/getting-started/migration': '/start-here/from-cslol/',
    '/guides/mod-management': '/using-mods/',
    '/guides/mod-management/installing-mods': '/using-mods/library/',
    '/guides/mod-management/profiles': '/using-mods/profiles/',
    '/guides/mod-management/mod-folders': '/using-mods/folders/',
    '/guides/mod-management/troubleshooting': '/using-mods/troubleshooting/',
    '/guides/mod-creation': '/making-mods/',
    '/guides/mod-creation/workshop-overview': '/making-mods/workshop/',
    '/guides/mod-creation/creating-a-project': '/making-mods/project/',
    '/guides/mod-creation/layers': '/making-mods/layers/',
    '/guides/mod-creation/string-overrides': '/making-mods/string-overrides/',
    '/guides/mod-creation/packaging': '/making-mods/packaging/',
    '/guides/contributing/wiki-authoring': '/contributing/wiki-authoring/',
    '/guides/contributing/project-guidelines': '/contributing/project-guidelines/',
    '/guides/contributing/building-from-source': '/contributing/building-from-source/',
    '/guides/contributing/architecture': '/contributing/architecture/',
    '/community/glossary': '/glossary/',
  },

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
        // Makes a sidebar group with an Overview page navigate to it on click
        // rather than only expanding. See the component for details.
        Sidebar: './src/components/starlight/Sidebar.astro',
        // Bespoke splash hero - see the component for what it renders.
        Hero: './src/components/starlight/Hero.astro',
        // Adds the Fonts API <Font> tags to the default head.
        Head: './src/components/starlight/Head.astro',
      },
      head: [
        {
          tag: 'script',
          content: `document.addEventListener('DOMContentLoaded',()=>{requestAnimationFrame(()=>{document.querySelector('.sidebar-pane')?.classList.add('sl-sidebar-loaded')})})`,
        },
      ],
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
            {
              label: 'Coming from cslol?',
              slug: 'start-here/from-cslol',
              badge: { text: 'Migrating', variant: 'tip' },
            },
          ],
        },
        {
          label: 'Using Mods',
          items: [
            { label: 'Overview', slug: 'using-mods' },
            { label: 'Managing Your Library', slug: 'using-mods/library' },
            { label: 'Profiles', slug: 'using-mods/profiles' },
            { label: 'Mod Folders', slug: 'using-mods/folders' },
            { label: 'Updating After a Patch', slug: 'using-mods/patch-updates' },
            { label: 'Troubleshooting', slug: 'using-mods/troubleshooting' },
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
              slug: 'tools/league-mod/overview',
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
              label: 'league-mod',
              collapsed: true,
              badge: { text: 'CLI', variant: 'note' },
              items: [{ label: 'Overview', slug: 'tools/league-mod/overview' }],
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
