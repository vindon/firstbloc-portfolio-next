import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';

const SKYLINE_DIR = path.resolve(__dirname, '../app/hero-skyline');
const GLOBALS_CSS = path.resolve(__dirname, '../app/globals.css');

// Per-file budget for a decorative background. Well above today's ~40 KB, well below "someone
// pasted a raster into an SVG".
const MAX_BYTES = 80 * 1024;

const svgFiles = readdirSync(SKYLINE_DIR).filter((name) => name.endsWith('.svg'));

describe('hero skyline assets', () => {
  it('ships one composition per breakpoint', () => {
    expect(svgFiles.sort()).toEqual([
      'skyline-desktop.svg',
      'skyline-mobile.svg',
      'skyline-tablet.svg',
    ]);
  });

  describe.each(svgFiles)('%s', (name) => {
    const source = readFileSync(path.join(SKYLINE_DIR, name), 'utf8');

    it('is a plain, static SVG with no active or external content', () => {
      // Loaded as a CSS background these can't run script anyway; this keeps it true if someone
      // later inlines or embeds one, and blocks anything that could phone home.
      const forbidden = [
        /<script/i,
        /<foreignObject/i,
        /<style/i,
        /<image/i,
        /<use/i,
        /\son[a-z]+\s*=/i,
        /\b(?:xlink:)?href\s*=/i,
        /javascript:/i,
        /@import/i,
        /url\(\s*['"]?https?:/i,
      ];
      const hits = forbidden.filter((pattern) => pattern.test(source)).map(String);
      expect(hits).toEqual([]);
    });

    it('references no origin other than the SVG namespace', () => {
      const origins = [...source.matchAll(/https?:\/\/[^\s"')]+/g)].map((m) => m[0]);
      expect(origins.every((origin) => origin === 'http://www.w3.org/2000/svg')).toBe(true);
    });

    it('stays inside the size budget', () => {
      expect(statSync(path.join(SKYLINE_DIR, name)).size).toBeLessThanOrEqual(MAX_BYTES);
    });
  });

  it('every skyline the stylesheet references exists', () => {
    const css = readFileSync(GLOBALS_CSS, 'utf8');
    const referenced = [...css.matchAll(/url\(["']?\.\/hero-skyline\/([^"')]+)["']?\)/g)].map(
      (m) => m[1],
    );
    expect(referenced.sort()).toEqual(svgFiles.sort());
  });
});
