# Hero skyline generator

Generates the three decorative SVGs in `app/hero-skyline/` (phone, tablet, desktop) that sit behind the
home page hero. They are committed, so the site never runs this at build time; this is the source of
truth for changing them.

```sh
npm run hero:generate                     # rewrites app/hero-skyline/*.svg
npm run hero:generate -- --out /tmp/skyl  # write elsewhere, e.g. to diff against the committed files
```

No dependencies and no build step: it runs on Node's built-in TypeScript support (Node 24, `.mts`).

## How it works

Everything is placed on one isometric grid, and every block is a whole number of **modules** (a module
is `module` pixels), so all edges line up.

| File          | Role                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------- |
| `specs.mts`   | The three compositions. **Edit here** to change heights, landmarks or where cubes drop.   |
| `layout.mts`  | Packs buildings onto an occupancy grid, back to front, following a height envelope.       |
| `isometric.mts` | Projection and box drawing: each visible face is cut into unit cells.                  |
| `palette.mts` | The orange pigment ramps (keep in step with the accent tokens in `app/globals.css`).      |
| `render.mts`  | Assembles the SVG: dot grid, buildings, ghost lots, dashed guides and dropping cubes.     |
| `random.mts`  | Seeded PRNG, so a given `seed` always produces the same skyline.                          |

## Changing the art

1. Edit `specs.mts` (heights come from each spec's `envelope`, capped by `maxHeight`; `landmarks` are
   hand-placed; `lots` are the dashed plots and the cubes dropping into them).
2. `npm run hero:generate`, look at the result in a browser at each width, then commit the SVGs.
3. If the hero's overall height changes, regenerate the Linux visual baselines by adding the
   `update-visual-baselines` label to the PR (see `.github/workflows/update-visual-baselines.yml`).

**The order in which `layout.mts` consumes random numbers is part of the output.** Changing it (even
without changing any spec) reshuffles the whole skyline. `skyline.test.ts` fails if the generator and
the committed SVGs ever disagree, so a stray edit on either side cannot slip through.

## Constraints

- Output must stay static and script-free (`lib/hero-skyline.test.ts` enforces this on the committed files).
- Keep each SVG under 80 KB.
- The `width`/`height` of each spec must match the `aspect-ratio` of its breakpoint in `.hero-skyline`
  (`app/globals.css`): 480 / 900 (phone), 900 / 1000 (tablet), 1600 / 900 (desktop).
