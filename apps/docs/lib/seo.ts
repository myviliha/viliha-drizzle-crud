export const siteConfig = {
	name: "nestjs-drizzle-crud",
	version: "3.1.0",
	description:
		"Type-safe CRUD for Drizzle ORM in NestJS — configure once, every entity gets full CRUD.",
	url:
		process.env.NEXT_PUBLIC_SITE_URL ?? "https://nestjs-drizzle-crud.vercel.app",
	github: "https://github.com/myviliha/viliha-drizzle-crud",
	npm: "https://www.npmjs.com/package/nestjs-drizzle-crud",
	license: "MIT",
	repoPath: "blob/main/content/docs",
};

export type SiteConfig = typeof siteConfig;
