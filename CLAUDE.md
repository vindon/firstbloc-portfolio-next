@AGENTS.md

# CLAUDE.md — Firstbloc

Personal/brand portfolio site, tagline "Enterprise AI Strategy, Agentic Systems & CX Automation." Next.js 16, deployed on Vercel (project-scoped plugin). GitHub: `vindon/firstbloc-portfolio-next`.

## Design system — settled, don't relitigate
- Theme lives in `app/globals.css`: light warm-paper background, orange accent (`--accent:#FF4800`, `--accent-deep:#C93700`), fonts Inter (`--font-sans`) + IBM Plex Mono (`--font-mono`), brand mark is a 3-triangle prism (`components/BrandBlockIcon.tsx`).
- **The current warm/orange theme is final.** Nine alternate palette directions (light, dark-neutral, teal, violet, graphite, glassmorphism, amber, monochrome, lime) were reviewed and rejected 2026-09-07 — "not impressed... don't like the variations." Three more muted-pigment rounds (aubergine/oxblood/ink/bronze style) were rejected 2026-09-08 for the same underlying reason: flat, single-hue "paint chip" colors (plain violet-600/blue-600/rose-600/amber-600, or a tinted-neutral base with an alpha-blended glow) read as generic AI-generated design regardless of hue name.
- **Don't pitch broad recolors or a palette menu.** Default to small, targeted visual changes (icons, layout, copy). If a color change is genuinely wanted, wait for an explicit scoped ask ("change just the footer to X") rather than offering alternatives.
- If a color exploration is ever explicitly requested again: use richer mixed/muted pigment tones with real tonal depth (a base/mid/highlight ramp, not one hex), a fully saturated/hue-true base rather than a tinted neutral, and `mix-blend-mode:screen` (not plain alpha) for any glow — and don't repeat the same mockup presentation format across rounds. A reference image/site is faster than another guessing round.
- Don't self-limit scope, positioning, or pricing on Vinoth's behalf across any of his projects — present options, let him decide.

