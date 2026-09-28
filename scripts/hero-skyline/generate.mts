// Regenerates the hero skyline SVGs from ./specs.ts.
//
//   npm run hero:generate                 writes to app/hero-skyline
//   npm run hero:generate -- --out <dir>  writes somewhere else (useful for diffing)
//
// Runs directly on Node's built-in TypeScript support: no build step, no extra dependencies.
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { renderSkyline } from './render.mts';
import { SKYLINES } from './specs.mts';

const DEFAULT_OUT_DIR = 'app/hero-skyline';

function outDirFrom(args: readonly string[]): string {
  const flag = args.indexOf('--out');
  if (flag === -1) return DEFAULT_OUT_DIR;
  const value = args[flag + 1];
  if (!value) throw new Error('--out needs a directory');
  return value;
}

const outDir = path.resolve(outDirFrom(process.argv.slice(2)));
mkdirSync(outDir, { recursive: true });

for (const { file, spec } of SKYLINES) {
  const svg = renderSkyline(spec);
  writeFileSync(path.join(outDir, file), svg);
  console.log(`${file}  ${(svg.length / 1024).toFixed(1)} KB`);
}
