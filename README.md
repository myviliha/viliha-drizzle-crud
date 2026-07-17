# viliha-drizzle

Monorepo for [**nestjs-drizzle-crud**](./packages/nestjs-drizzle-crud) — a
complete, type-safe CRUD abstraction for [Drizzle ORM](https://orm.drizzle.team/)
in [NestJS](https://nestjs.com/).

Turborepo + pnpm, TypeScript 7. Lint/format via [Biome](https://biomejs.dev/).

## Layout

```
packages/
  nestjs-drizzle-crud/   The published npm package (the only public artifact)
apps/
  docs/                  Next.js 16 + Fumadocs docs site → GitHub Pages (static export)
  api/                   Example NestJS 11 app; doubles as the live e2e testbed
```

Only `packages/nestjs-drizzle-crud` is published to npm. `apps/*` are private.

## Develop

```bash
pnpm install
pnpm build        # turbo: builds the library, then the apps that depend on it
pnpm test         # library unit tests + api e2e (e2e needs DATABASE_URL, else skips)
pnpm typecheck
pnpm lint         # biome, whole workspace
pnpm format       # biome --write
```

Per package:

```bash
pnpm --filter nestjs-drizzle-crud test
pnpm --filter nestjs-drizzle-crud-docs dev   # docs on http://localhost:3000
pnpm --filter api dev                        # api  on http://localhost:4000
```

`pnpm dev` (turbo) runs both together — docs on :3000, api on :4000.

## TypeScript 7 toolchain notes

TS 7 ships the native compiler; a few ecosystem tools don't consume its API yet.
Where that bit, the workspace routes around it rather than downgrading the package:

- **Tests** use `@swc/jest` (not `ts-jest`, which is incompatible with TS 7).
  Types are still enforced by `tsc --noEmit` in `typecheck`.
- **Lint/format** uses Biome (not `typescript-eslint`, which caps at TS < 6.1).
- **`apps/docs`** pins TypeScript 5.9 locally, because Fumadocs' Twoslash
  code-sample renderer needs the classic compiler API. The published library and
  the api app are on TS 7.

## The example api (apps/api)

A real NestJS app exercising the library against the Postgres in
`apps/api/.env` (`DATABASE_URL`). It maps the existing geo tables — regions →
countries → states → cities (belongs-to) plus a uuid-keyed `tags` table — and
exposes `/countries` and `/tags`. `test/app.e2e-spec.ts` boots the app and hits
it over HTTP; reads use the seeded tables, writes use `tags` and clean up.

Copy `apps/api/.env.example` → `apps/api/.env` and set `DATABASE_URL`.

## CI / CD

- **CI** (`.github/workflows/ci.yml`) — lint · typecheck · build · test on push/PR.
- **Docs** (`deploy-docs.yml`) — static export → GitHub Pages on push to `main`
  (enable Settings → Pages → Source = GitHub Actions). Add `DATABASE_URL` as a
  repo secret to run the api e2e in CI.
- **Release** (`release.yml`) — publishes `nestjs-drizzle-crud` to npm on a
  GitHub Release (needs `NPM_TOKEN`).
