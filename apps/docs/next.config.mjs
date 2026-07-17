import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

// GitHub Pages project sites are served under /<repo>/. The deploy workflow
// sets NEXT_PUBLIC_BASE_PATH to the repo name; locally it is empty (root).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
	// Static HTML export — GitHub Pages serves files, not a Node server.
	output: "export",
	// GitHub Pages does not rewrite extensionless URLs, so emit `route/index.html`.
	trailingSlash: true,
	basePath,
	// next/image optimization needs a server; disable for static export.
	images: { unoptimized: true },
	serverExternalPackages: ["typescript", "twoslash"],
};

export default withMDX(config);
