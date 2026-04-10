import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://wiki.leaguetoolkit.dev',
  output: 'static',

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
      ],
      customCss: ['./src/styles/tailwind.css', './src/styles/custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'getting-started/introduction' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Your First Mod', slug: 'getting-started/first-mod' },
            { label: 'Migrating from cslol', slug: 'getting-started/migration' },
          ],
        },
        {
          label: 'Guides',
          items: [
            {
              label: 'Mod Management',
              items: [
                { label: 'Installing Mods', slug: 'guides/mod-management/installing-mods' },
                { label: 'Profiles', slug: 'guides/mod-management/profiles' },
                { label: 'Mod Folders', slug: 'guides/mod-management/mod-folders' },
                { label: 'Troubleshooting', slug: 'guides/mod-management/troubleshooting' },
              ],
            },
            {
              label: 'Mod Creation',
              items: [
                { label: 'Workshop Overview', slug: 'guides/mod-creation/workshop-overview' },
                { label: 'Creating a Project', slug: 'guides/mod-creation/creating-a-project' },
                { label: 'Layers', slug: 'guides/mod-creation/layers' },
                { label: 'Packaging', slug: 'guides/mod-creation/packaging' },
              ],
            },
            {
              label: 'Contributing',
              items: [
                { label: 'Wiki Authoring', slug: 'guides/contributing/wiki-authoring' },
                { label: 'Project Guidelines', slug: 'guides/contributing/project-guidelines' },
                { label: 'Building from Source', slug: 'guides/contributing/building-from-source' },
                { label: 'Architecture', slug: 'guides/contributing/architecture' },
              ],
            },
          ],
        },
        {
          label: 'Tools',
          items: [
            {
              label: 'ltk-manager',
              items: [
                { label: 'Overview', slug: 'tools/ltk-manager/overview' },
                { label: 'Features', slug: 'tools/ltk-manager/features' },
                { label: 'Configuration', slug: 'tools/ltk-manager/configuration' },
              ],
            },
            {
              label: 'league-toolkit',
              items: [
                { label: 'Overview', slug: 'tools/league-toolkit/overview' },
                { label: 'Crate Guide', slug: 'tools/league-toolkit/crate-guide' },
              ],
            },
          ],
        },
        {
          label: 'Reference',
          items: [
            {
              label: 'File Formats',
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
              items: [{ label: 'Overview', slug: 'reference/metaclasses/overview' }],
            },
            {
              label: 'Hashing',
              items: [{ label: 'Algorithms', slug: 'reference/hashing/algorithms' }],
            },
          ],
        },
        {
          label: 'Community',
          items: [
            { label: 'Useful Links', slug: 'community/links' },
            { label: 'Glossary', slug: 'community/glossary' },
          ],
        },
      ],
    }),
    svelte(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare()
});