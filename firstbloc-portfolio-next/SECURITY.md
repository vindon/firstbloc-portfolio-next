# Security Policy

## Supported versions

The project maintainers aim to support the latest released version of the codebase and the default branch. Security fixes are prioritized for the active branch and the most recent release.

## Reporting a vulnerability

Please do not open a public GitHub issue for security vulnerabilities.

Instead, report it privately through GitHub's security advisory feature for this repository or via the repository maintainers' private security contact if provided in the repository settings.

When reporting, include:

- a clear description of the issue
- affected files, endpoints, or commands
- reproduction steps or exploit details
- impact assessment
- any suggested remediation

We will acknowledge receipt as quickly as possible and work toward a fix and coordinated disclosure.

## Disclosure policy

We ask that security researchers and users allow a reasonable amount of time to investigate and remediate a vulnerability before public disclosure. We will do our best to fix issues promptly and will coordinate public disclosure once a fix is available.

## Security best practices

- Keep environment variables and API keys out of source control.
- Rotate credentials if they are ever exposed.
- Review dependencies regularly.
- Use the repository's CI and lint/test checks before publishing changes.
