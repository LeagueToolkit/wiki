#!/usr/bin/env node
/**
 * Renders a 1200 x 630 Open Graph card: the image Discord, X and others show for a shared link.
 *
 *   pnpm og-card <target> --title "Hexshade" [--subtitle "..."] [--icon path] [--background path]
 *
 * `target` is a path under `src/assets/` without an extension; the card is written as `<target>.png`
 * and a page points its `ogImage` frontmatter at it. Without `--background` the card uses the brand
 * gradient. Text is drawn with the system's Segoe UI, so render cards on Windows and commit them.
 */
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;
const LOGO = 'src/assets/logo.svg';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    title: { type: 'string' },
    subtitle: { type: 'string', default: '' },
    icon: { type: 'string' },
    background: { type: 'string' },
  },
});

if (positionals.length !== 1 || !values.title) {
  console.error(
    'Usage: pnpm og-card <target> --title "..." [--subtitle "..."] [--icon path] [--background path]',
  );
  process.exit(1);
}

const out = `${resolve('src/assets', positionals[0])}.png`;
mkdirSync(dirname(out), { recursive: true });

const escape = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const background = values.background
  ? await sharp(values.background)
      .resize(WIDTH, HEIGHT, { fit: 'cover' })
      .modulate({ brightness: 1.25, saturation: 1.1 })
      .toBuffer()
  : Buffer.from(
      `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glow" cx="0.85" cy="0.1" r="0.9">
            <stop offset="0" stop-color="#7d4bfa" stop-opacity="0.55"/>
            <stop offset="0.6" stop-color="#4b7dfa" stop-opacity="0.12"/>
            <stop offset="1" stop-color="#4b7dfa" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="#0d0e14"/>
        <rect width="100%" height="100%" fill="url(#glow)"/>
      </svg>`,
    );

// A left-to-right scrim keeps the text legible over any screenshot.
const scrim = Buffer.from(
  `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="s" x1="0" x2="1">
        <stop offset="0" stop-color="#0b0c10" stop-opacity="0.92"/>
        <stop offset="0.4" stop-color="#0b0c10" stop-opacity="0.55"/>
        <stop offset="0.65" stop-color="#0b0c10" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#s)"/>
  </svg>`,
);

const iconSize = 128;
/** The site card names the wiki in its title, so only other cards carry the footer mark. */
const footer = values.title !== 'LTK Wiki';
const titleY = values.icon ? 360 : 330;
const text = Buffer.from(
  `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <text x="80" y="${titleY}" font-family="Segoe UI" font-weight="700" font-size="88" fill="#ffffff">${escape(values.title)}</text>
    <text x="82" y="${titleY + 58}" font-family="Segoe UI" font-size="34" fill="#c9cdd9">${escape(values.subtitle)}</text>
    ${footer ? `<text x="136" y="${HEIGHT - 62}" font-family="Segoe UI" font-weight="700" font-size="30" fill="#ffffff">LTK Wiki</text>` : ''}
  </svg>`,
);

const layers = [{ input: scrim }, { input: text }];
if (footer)
  layers.push({ input: await sharp(LOGO).resize(40, 40).toBuffer(), left: 80, top: HEIGHT - 94 });
if (values.icon) {
  const icon = await sharp(values.icon).resize(iconSize, iconSize).toBuffer();
  layers.push({ input: icon, left: 76, top: titleY - 88 - iconSize - 20 });
}

await sharp(background).composite(layers).png().toFile(out);
console.log(out);
