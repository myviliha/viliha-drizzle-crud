// e2e tests boot the real Nest app and hit it over HTTP (supertest), talking to
// the Postgres in DATABASE_URL. Transpiled with @swc/jest (TS7-compatible).
module.exports = {
	testEnvironment: "node",
	rootDir: ".",
	testMatch: ["**/test/**/*.e2e-spec.ts"],
	setupFiles: ["reflect-metadata"],
	testTimeout: 30000,
	transform: {
		"^.+\\.ts$": [
			"@swc/jest",
			{
				jsc: {
					parser: { syntax: "typescript", decorators: true },
					transform: { decoratorMetadata: true, legacyDecorator: true },
					target: "es2022",
				},
			},
		],
	},
};
