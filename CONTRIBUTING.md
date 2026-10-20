# Contributing

Thanks for helping improve the firstbloc portfolio. Contributions should
preserve the site's accessible, responsive experience and established visual
identity.

## Set up the project

Use Node.js 24.15.0 or newer and npm:

```bash
git clone https://github.com/vindon/firstbloc-portfolio-next.git
cd firstbloc-portfolio-next
npm ci
cp .env.example .env.local
npm run dev
```

Environment variables are documented in `.env.example`. They are optional
for local development.

## Before opening a pull request

Run the relevant checks; `npm run verify` runs the full CI sequence:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

For visual or layout changes, update both the macOS and Linux screenshots in
`e2e/responsive.spec.ts-snapshots/`. The README documents how to regenerate
each platform's baselines.

## Branch and pull request workflow

1. Branch from `master` using a short descriptive name, such as
   `fix/mobile-navigation` or `feature/contact-form`.
2. Keep changes focused and use clear commit messages.
3. Open a pull request against `master`, complete the pull request template,
   and link any related issue.
4. Make sure CI and CodeQL checks pass, address review feedback, and obtain
   approval from a reviewer before merging.

The `master` branch is protected on GitHub: changes must come through a pull
request with one approval, the `verify` and `analyze` checks passing, and the
branch up to date with its base. Stale approvals are dismissed, and the rules
also apply to administrators.

Pull requests should explain the problem and solution, call out user-visible
changes, and include screenshots for visual changes. Add or update tests for
behavior changes. Do not include secrets, generated build output, or unrelated
formatting changes.

## Release and versioning

The website is deployed through Vercel and is not published as an npm package.
Use Semantic Versioning for project milestones, with Git tags in the form
`vMAJOR.MINOR.PATCH` (for example, `v1.2.0`). Increment MAJOR for incompatible
changes, MINOR for backward-compatible features, and PATCH for fixes. Before
tagging, merge to `master`, confirm CI passes, and update the release notes in
a GitHub Release describing the changes. Create the matching tag on the
release commit and publish the GitHub Release.
