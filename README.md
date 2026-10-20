# firstbloc portfolio

[![CI](https://github.com/vindon/firstbloc-portfolio-next/actions/workflows/ci.yml/badge.svg)](https://github.com/vindon/firstbloc-portfolio-next/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deployment](https://img.shields.io/website?url=https%3A%2F%2Ffirstbloc-portfolio-next.vercel.app)](https://firstbloc-portfolio-next.vercel.app)

Production portfolio site for Vinoth Nataraj (firstbloc), focused on enterprise AI strategy, agentic systems, and CX automation.

## Getting started

### Requirements

- Node.js 24.15.0 or newer
- npm

### Local development

```bash
git clone https://github.com/vindon/firstbloc-portfolio-next.git
cd firstbloc-portfolio-next
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The values in `.env.local`
are optional for local development; see `.env.example` for what each one does.

## Quality checks

Run the checks used by CI before opening a pull request:

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript --noEmit
npm run test       # Vitest unit/component tests
npm run build      # production build
npm run test:e2e   # Playwright e2e, visual-regression, and accessibility tests
npm run verify     # all of the above, in order
```

Playwright may need its browser installed locally:

```bash
npx playwright install chromium
```

### Visual regression baselines

`e2e/responsive.spec.ts-snapshots/` holds the screenshot baselines used by
Playwright's visual-regression assertions. Filenames are suffixed by
platform: `-darwin` for macOS (local dev) and `-linux` for the CI/Linux
environment. There are no Windows/win32 baselines — this project is a
macOS-dev, Linux-CI-only setup.

To regenerate the macOS baselines locally:

```bash
npm run test:e2e -- e2e/responsive.spec.ts --update-snapshots
```

To regenerate the Linux baselines (local dev is macOS but CI runs Linux),
use Docker with an image matching the installed `@playwright/test` version
(check `package.json` — currently `1.64.1`):

```bash
docker run --rm -v "$(pwd):/work" -w /work mcr.microsoft.com/playwright:v1.64.1-noble npx playwright test e2e/responsive.spec.ts --update-snapshots
```

Any CSS or copy change that touches page layout will require regenerating
**both** platforms' baselines.

## Contributing

Bug reports, feature requests, and pull requests are welcome. Please read
[CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow and pull
request expectations. Use the repository's issue forms for bugs and feature
requests.

## Security

Please report vulnerabilities privately. See [SECURITY.md](SECURITY.md) for
the responsible disclosure process.

## Releases

This is a deployed website, not a published npm package. See
[CONTRIBUTING.md](CONTRIBUTING.md#release-and-versioning) for the versioning
and release tagging process.

## License

The project is distributed under the [MIT License](LICENSE).
