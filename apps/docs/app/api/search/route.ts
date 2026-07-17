import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

// Static export: emit a prebuilt search index instead of a live server route
// (GitHub Pages has no server). Pair with `search={{ options: { type: "static" } }}`
// on <RootProvider> so the client fetches this index.
export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
	language: "english",
});
