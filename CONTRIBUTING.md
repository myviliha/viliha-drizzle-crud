# Contributing to nestjs-drizzle-crud

Thanks for your interest in contributing! This project is open source (MIT) and
welcomes issues and pull requests from everyone.

## Ways to contribute

- **Report a bug** — open a [Bug report](https://github.com/myviliha/viliha-drizzle-crud/issues/new/choose) issue.
- **Request a feature** — open a Feature request issue.
- **Fix / improve** — send a Pull Request (see below). Merged PRs make you a project contributor. 🎉
- **Ask / discuss** — use [Discussions](https://github.com/myviliha/viliha-drizzle-crud/discussions).

## Development setup

Requirements: **Node.js ≥ 20** and **npm**.

```bash
# 1. Fork the repo on GitHub, then clone YOUR fork
git clone https://github.com/<your-username>/viliha-drizzle-crud.git
cd viliha-drizzle-crud

# 2. Add the upstream remote (to keep your fork in sync)
git remote add upstream https://github.com/myviliha/viliha-drizzle-crud.git

# 3. Install dependencies
npm ci

# 4. Run the checks
npm run lint      # ESLint
npm test          # Jest
npm run build     # tsc build (must pass)
```

## Pull Request workflow

External contributors work from a **fork** — you don't need write access.

1. Sync your fork's `main` with upstream: `git fetch upstream && git rebase upstream/main`.
2. Create a branch off `main`:
   - `feat/<short-name>` for features
   - `fix/<short-name>` for bug fixes
   - `docs/<short-name>`, `test/<short-name>`, `chore/<short-name>` as appropriate
3. Make your change **with tests** (`test/`) and keep `npm run lint`, `npm test`, `npm run build` green.
4. Commit using **[Conventional Commits](https://www.conventionalcommits.org/)**:
   - `feat: add pagination to findAll`
   - `fix: handle null relations in update`
   - `docs:`, `test:`, `chore:`, `refactor:` …
5. Push to your fork and open a **Pull Request** against `myviliha/viliha-drizzle-crud:main`.
6. Fill in the PR template. CI (lint + test + build) runs automatically and must pass.
7. A maintainer reviews; address feedback by pushing more commits to the same branch.

> `main` is protected: changes land only via reviewed PRs with green CI. No direct pushes.

## Coding standards

- TypeScript, strict. Keep the public API typed.
- Run `npm run format` (Prettier) before committing.
- Add/adjust tests for any behavior change — coverage should not regress (`npm run test:cov`).
- Keep changes focused; one logical change per PR.

## Reporting security issues

Please do **not** open a public issue for security vulnerabilities. See [SECURITY.md](./SECURITY.md).

## Code of Conduct

By participating you agree to our [Code of Conduct](./CODE_OF_CONDUCT.md).
