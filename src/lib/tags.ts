/**
 * The wiki's tag vocabulary.
 *
 * One source for three consumers: the Zod enums in `content.config.ts`, the
 * chips under each page title, and the `/tags/` index pages. A term has to be
 * added here before a page can carry it - the schema rejects anything else.
 *
 * Tag slugs are globally unique across facets, because every tag resolves to
 * one `/tags/<slug>/` page.
 */

export const TYPES = [
  'overview',
  'tutorial',
  'guide',
  'concept',
  'reference',
  'troubleshooting',
  'faq',
] as const;

export const AUDIENCES = ['mod-user', 'mod-creator', 'tool-developer', 'contributor'] as const;

export const SUBJECTS = [
  // Tools
  'ltk-manager',
  'creator-workshop',
  'league-mod',
  'wadtools',
  'ltk-tex-utils',
  'ritobin-tools',
  'league-toolkit',
  'mimir',
  'lol-meta-classes',
  'cslol-manager',
  // Packages and projects
  'mod-project',
  'modpkg',
  'fantome',
  // Game file formats
  'wad',
  'bin',
  'ritobin',
  'skn',
  'skl',
  'anm',
  'tex',
  'mapgeo',
  'wgeo',
  'scb-sco',
  'legacy-formats',
  // Systems
  'hashing',
  'metaclasses',
  'overlay',
  'patcher',
  // Mod anatomy
  'layers',
  'string-overrides',
  'profiles',
  'load-order',
  // Workflow
  'installation',
  'packaging',
  'distribution',
  'migration',
  'validation',
  'patch-day',
  'safety',
  'wiki',
] as const;

export const STATUSES = ['wip', 'planned', 'deprecated', 'legacy'] as const;

export type TagType = (typeof TYPES)[number];
export type TagAudience = (typeof AUDIENCES)[number];
export type TagSubject = (typeof SUBJECTS)[number];
export type TagStatus = (typeof STATUSES)[number];
export type TagSlug = TagType | TagAudience | TagSubject | TagStatus;

export type TagFacet = 'type' | 'audience' | 'subject' | 'status';

/** Subjects are grouped only for display on the tag index. */
export type SubjectGroup = 'tools' | 'packages' | 'formats' | 'systems' | 'anatomy' | 'workflow';

export interface TagMeta {
  label: string;
  /** One line, shown on the tag's own index page and in its tooltip. */
  description: string;
  /** Anchor on /glossary/ when the term is defined there. */
  glossary?: string;
}

export const TYPE_META: Record<TagType, TagMeta> = {
  overview: {
    label: 'Overview',
    description: 'A map of a section - what it covers and where to go next.',
  },
  tutorial: {
    label: 'Tutorial',
    description: 'A start-to-finish walkthrough with one outcome.',
  },
  guide: { label: 'Guide', description: 'How to carry out a specific task.' },
  concept: { label: 'Concept', description: 'How something works, and why it works that way.' },
  reference: {
    label: 'Reference',
    description: 'Specifications, tables, and exhaustive detail to look things up in.',
  },
  troubleshooting: {
    label: 'Troubleshooting',
    description: 'Symptoms, causes, and fixes.',
  },
  faq: { label: 'FAQ', description: 'Short answers to the questions people ask most.' },
};

export const AUDIENCE_META: Record<TagAudience, TagMeta> = {
  'mod-user': { label: 'Mod user', description: 'You install and play with mods.' },
  'mod-creator': { label: 'Mod creator', description: 'You build and publish mods.' },
  'tool-developer': {
    label: 'Tool developer',
    description: 'You write software that reads or writes League files and LTK mods.',
  },
  contributor: {
    label: 'Contributor',
    description: 'You work on LeagueToolkit itself, or on this wiki.',
  },
};

export const STATUS_META: Record<TagStatus, TagMeta> = {
  wip: {
    label: 'Under Construction',
    description: 'The feature documented here is incomplete or actively changing.',
  },
  planned: { label: 'Planned', description: 'Specified, but not implemented yet.' },
  deprecated: {
    label: 'Deprecated',
    description: 'Superseded, and documented for people still on it.',
  },
  legacy: {
    label: 'Legacy',
    description: 'Older formats and tooling, documented for compatibility.',
  },
};

export const SUBJECT_META: Record<TagSubject, TagMeta & { group: SubjectGroup }> = {
  'ltk-manager': {
    group: 'tools',
    label: 'LTK Manager',
    description: 'The desktop mod manager.',
    glossary: '#ltk-manager',
  },
  'creator-workshop': {
    group: 'tools',
    label: 'Creator Workshop',
    description: 'The mod project editor built into LTK Manager.',
  },
  'league-mod': {
    group: 'tools',
    label: 'league-mod',
    description: 'The CLI for creating, packing, and inspecting mod projects.',
  },
  wadtools: {
    group: 'tools',
    label: 'wadtools',
    description: 'CLI for extracting, listing, and diffing WAD archives.',
    glossary: '#wadtools',
  },
  'ltk-tex-utils': {
    group: 'tools',
    label: 'ltk-tex-utils',
    description: 'CLI and Explorer integration for .tex textures.',
  },
  'ritobin-tools': {
    group: 'tools',
    label: 'ritobin-tools',
    description: 'CLI for converting .bin property trees to text and back.',
  },
  'league-toolkit': {
    group: 'tools',
    label: 'league-toolkit',
    description: 'The Rust library the other tools are built on.',
  },
  mimir: {
    group: 'tools',
    label: 'Mimir',
    description: 'Memory-mapped hash-to-path tables, distributed as .hashdb.',
  },
  'lol-meta-classes': {
    group: 'tools',
    label: 'lol-meta-classes',
    description: "Extracts the game's metaclass schema across patches.",
  },
  'cslol-manager': {
    group: 'tools',
    label: 'cslol-manager',
    description: 'The predecessor mod manager, now deprecated.',
    glossary: '#cslol-manager',
  },

  'mod-project': {
    group: 'packages',
    label: 'Mod projects',
    description: 'The folder layout and manifest standard mods are authored in.',
  },
  modpkg: {
    group: 'packages',
    label: '.modpkg',
    description: 'The native LeagueToolkit mod package format.',
    glossary: '#modpkg',
  },
  fantome: {
    group: 'packages',
    label: '.fantome',
    description: 'The legacy mod package format, and the LeagueToolkit extension to it.',
    glossary: '#fantome',
  },

  wad: {
    group: 'formats',
    label: 'WAD',
    description: 'The archive format almost every game file lives in.',
    glossary: '#wad',
  },
  bin: {
    group: 'formats',
    label: 'BIN',
    description: "Property bins - the game's serialised object data.",
    glossary: '#bin',
  },
  ritobin: {
    group: 'formats',
    label: 'Ritobin',
    description: 'The text representation of BIN files.',
    glossary: '#ritobin',
  },
  skn: {
    group: 'formats',
    label: 'SKN',
    description: 'Skinned meshes.',
    glossary: '#skn',
  },
  skl: {
    group: 'formats',
    label: 'SKL',
    description: 'Skeletons.',
    glossary: '#skl',
  },
  anm: {
    group: 'formats',
    label: 'ANM',
    description: 'Animations.',
    glossary: '#anm',
  },
  tex: {
    group: 'formats',
    label: 'TEX',
    description: 'Textures.',
    glossary: '#tex',
  },
  mapgeo: { group: 'formats', label: 'MapGeo', description: 'Map geometry.' },
  wgeo: { group: 'formats', label: 'WGEO', description: 'The legacy world geometry format.' },
  'scb-sco': {
    group: 'formats',
    label: 'SCB/SCO',
    description: 'Static meshes, in binary and ASCII form.',
  },
  'legacy-formats': {
    group: 'formats',
    label: 'Legacy formats',
    description: 'Deprecated formats still found in older content.',
  },

  hashing: {
    group: 'systems',
    label: 'Hashing',
    description: 'The hash functions League uses in place of filenames.',
  },
  metaclasses: {
    group: 'systems',
    label: 'Metaclasses',
    description: 'The schema that gives BIN properties their meaning.',
    glossary: '#metaclass',
  },
  overlay: {
    group: 'systems',
    label: 'Overlay',
    description: 'The separate file tree League reads instead of your install.',
    glossary: '#overlay',
  },
  patcher: {
    group: 'systems',
    label: 'Patcher',
    description: 'The process that makes the running game load the overlay.',
    glossary: '#patcher',
  },

  layers: {
    group: 'anatomy',
    label: 'Layers',
    description: 'Stackable, optional pieces of a single mod.',
    glossary: '#layer',
  },
  'string-overrides': {
    group: 'anatomy',
    label: 'String overrides',
    description: "Per-layer, per-locale edits to the game's text.",
  },
  profiles: {
    group: 'anatomy',
    label: 'Profiles',
    description: 'Named sets of enabled mods you switch between.',
    glossary: '#profile',
  },
  'load-order': {
    group: 'anatomy',
    label: 'Load order',
    description: 'Which mod wins when two of them change the same file.',
  },

  installation: {
    group: 'workflow',
    label: 'Installation',
    description: 'Getting a tool onto your machine and configured.',
  },
  packaging: {
    group: 'workflow',
    label: 'Packaging',
    description: 'Turning a project into a distributable package.',
  },
  distribution: {
    group: 'workflow',
    label: 'Distribution',
    description: 'Sharing a finished mod, and where mods are hosted.',
  },
  migration: {
    group: 'workflow',
    label: 'Migration',
    description: 'Moving from an older tool or format to the current one.',
  },
  validation: {
    group: 'workflow',
    label: 'Validation',
    description: 'Checking a project or package before shipping it.',
  },
  'patch-day': {
    group: 'workflow',
    label: 'Patch day',
    description: 'What a League patch breaks, and the routine for getting back in game.',
  },
  safety: {
    group: 'workflow',
    label: 'Safety',
    description: "Account risk, malware, and what mods can and can't do.",
  },
  wiki: {
    group: 'workflow',
    label: 'Wiki',
    description: 'Writing and contributing to this documentation site.',
  },
};

export const SUBJECT_GROUP_LABELS: Record<SubjectGroup, string> = {
  tools: 'Tools',
  packages: 'Packages and projects',
  formats: 'Game file formats',
  systems: 'Systems',
  anatomy: 'Mod anatomy',
  workflow: 'Workflow',
};

/** The frontmatter shape, mirrored by the Zod schema in content.config.ts. */
export interface PageTags {
  type: TagType;
  audience: TagAudience[];
  subject: TagSubject[];
  status?: TagStatus;
}

export interface ResolvedTag extends TagMeta {
  slug: TagSlug;
  facet: TagFacet;
}

const REGISTRY = new Map<string, ResolvedTag>([
  ...TYPES.map((slug): [string, ResolvedTag] => [
    slug,
    { slug, facet: 'type', ...TYPE_META[slug] },
  ]),
  ...AUDIENCES.map((slug): [string, ResolvedTag] => [
    slug,
    { slug, facet: 'audience', ...AUDIENCE_META[slug] },
  ]),
  ...SUBJECTS.map((slug): [string, ResolvedTag] => [
    slug,
    { slug, facet: 'subject', ...SUBJECT_META[slug] },
  ]),
  ...STATUSES.map((slug): [string, ResolvedTag] => [
    slug,
    { slug, facet: 'status', ...STATUS_META[slug] },
  ]),
]);

export const ALL_TAGS: ResolvedTag[] = [...REGISTRY.values()];

export function resolveTag(slug: TagSlug): ResolvedTag {
  const tag = REGISTRY.get(slug);
  if (!tag) throw new Error(`Unknown tag: ${slug}`);
  return tag;
}

/** Page order of the chips: what it is, who it's for, what it covers, how settled it is. */
export function resolvePageTags(tags: PageTags): ResolvedTag[] {
  return [
    resolveTag(tags.type),
    ...tags.audience.map(resolveTag),
    ...tags.subject.map(resolveTag),
    ...(tags.status ? [resolveTag(tags.status)] : []),
  ];
}

export function tagHref(slug: TagSlug): string {
  return `/tags/${slug}/`;
}
