#!/usr/bin/env node
/**
 * Turns a raw capture into the files the wiki serves.
 *
 *   pnpm media <input> <target> [--crop x,y,w,h] [--start s] [--duration s] [--poster s]
 *
 * `target` is a path under `src/assets/` without an extension:
 * - a video input writes `<target>.webm` (AV1), `<target>.mp4` (H.264) and
 *   `<target>.webp` (poster frame), for the `Video` component
 * - an image input writes `<target>.webp`, for the `Screenshot` component
 *
 * Needs ffmpeg and ffprobe on PATH for video.
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import sharp from 'sharp';

/** Widest clip kept: the content column at 2x, so a clip stays sharp on high-DPI screens. */
const MAX_WIDTH = 1600;
/** Widest image kept. Pages serve the file as it is, so this is also the widest a reader gets. */
const MAX_IMAGE_WIDTH = 2560;
/** Highest frame rate kept. UI clips gain nothing above it. */
const MAX_FPS = 30;
/** Size above which a clip is worth trimming or cropping. */
const WARN_BYTES = 5 * 1024 * 1024;

const VIDEO_EXTENSIONS = new Set(['.mp4', '.mov', '.mkv', '.webm', '.avi', '.gif']);

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    crop: { type: 'string' },
    start: { type: 'string' },
    duration: { type: 'string' },
    poster: { type: 'string', default: '0' },
  },
});

if (positionals.length !== 2) {
  console.error('Usage: pnpm media <input> <target> [--crop x,y,w,h] [--start s] [--duration s]');
  process.exit(1);
}

const [input, target] = positionals;
const out = resolve('src/assets', target);
mkdirSync(dirname(out), { recursive: true });

const crop = values.crop?.split(',').map(Number);
if (crop && (crop.length !== 4 || crop.some((n) => !Number.isInteger(n) || n < 0))) {
  console.error(`--crop needs four whole numbers x,y,w,h, got "${values.crop}"`);
  process.exit(1);
}

const report = (path) => {
  const bytes = statSync(path).size;
  const warn = bytes > WARN_BYTES ? '  <- large, trim or crop it' : '';
  console.log(`${path}  ${(bytes / 1024).toFixed(0)}K${warn}`);
};

/**
 * Encodes an image three ways and keeps the smallest. Each encoding is visually lossless:
 * flat UI captures usually win with lossless or near-lossless, rendered scenes with quality 95.
 */
const writeWebp = async (image, path) => {
  const encodings = [
    { lossless: true, effort: 6 },
    { nearLossless: true, quality: 80, effort: 6 },
    { quality: 95, smartSubsample: true, effort: 6 },
  ];
  const buffers = await Promise.all(encodings.map((o) => image.clone().webp(o).toBuffer()));
  writeFileSync(
    path,
    buffers.reduce((a, b) => (b.length < a.length ? b : a)),
  );
  report(path);
};

const run = (command, args) => {
  // A poster frame arrives on stdout as a PNG, far past the 1 MB default buffer.
  const result = spawnSync(command, args, {
    stdio: ['ignore', 'pipe', 'inherit'],
    maxBuffer: 256 * 1024 * 1024,
  });
  if (result.status !== 0) {
    console.error(`${command} failed: ${result.error?.message ?? `exit code ${result.status}`}`);
    process.exit(1);
  }
  return result.stdout;
};

if (!VIDEO_EXTENSIONS.has(extname(input).toLowerCase())) {
  let image = sharp(input);
  if (crop) image = image.extract({ left: crop[0], top: crop[1], width: crop[2], height: crop[3] });
  image = image.resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true });
  await writeWebp(image, `${out}.webp`);
  process.exit(0);
}

const rate = run('ffprobe', [
  '-v',
  'error',
  '-select_streams',
  'v:0',
  '-show_entries',
  'stream=avg_frame_rate',
  '-of',
  'csv=p=0',
  input,
])
  .toString()
  .trim();
const [num, den] = rate.split('/').map(Number);
const fps = den ? num / den : num;

const filters = [
  crop && `crop=${crop[2]}:${crop[3]}:${crop[0]}:${crop[1]}`,
  `scale='min(${MAX_WIDTH},iw)':-2:flags=lanczos`,
  fps > MAX_FPS && `fps=${MAX_FPS}`,
  'format=yuv420p',
]
  .filter(Boolean)
  .join(',');

const trim = [
  ...(values.start ? ['-ss', values.start] : []),
  ...(values.duration ? ['-t', values.duration] : []),
];
const common = ['-y', '-v', 'error', ...trim, '-i', input, '-vf', filters, '-an'];

run('ffmpeg', [
  ...common,
  '-c:v',
  'libaom-av1',
  '-crf',
  '26',
  '-b:v',
  '0',
  '-cpu-used',
  '6',
  '-row-mt',
  '1',
  `${out}.webm`,
]);
report(`${out}.webm`);

run('ffmpeg', [
  ...common,
  '-c:v',
  'libx264',
  '-crf',
  '20',
  '-preset',
  'slow',
  '-movflags',
  '+faststart',
  `${out}.mp4`,
]);
report(`${out}.mp4`);

const frame = run('ffmpeg', [
  '-v',
  'error',
  '-ss',
  values.poster,
  '-i',
  `${out}.mp4`,
  '-frames:v',
  '1',
  '-f',
  'image2pipe',
  '-c:v',
  'png',
  '-',
]);
await writeWebp(sharp(frame), `${out}.webp`);
