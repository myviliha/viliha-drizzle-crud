import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

export const dynamic = "force-static";
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl =
		process.env.NEXT_PUBLIC_SITE_URL ?? "https://nestjs-drizzle-crud.vercel.app";

	const staticRoutes: MetadataRoute.Sitemap = [
		{ url: baseUrl, lastModified: new Date(), priority: 1.0 },
		{ url: `${baseUrl}/docs`, lastModified: new Date(), priority: 0.9 },
	];

	const docRoutes: MetadataRoute.Sitemap = source.getPages().map((page) => ({
		url: `${baseUrl}${page.url}`,
		lastModified: new Date(),
		changeFrequency: "weekly" as const,
		priority: 0.7,
	}));

	return [...staticRoutes, ...docRoutes];
}
