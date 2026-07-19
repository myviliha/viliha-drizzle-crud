// Renders schema.org JSON-LD. dangerouslySetInnerHTML is the standard way to
// emit structured data and is safe here: the input is our own static objects.
export function JsonLd({ data }: { data: object | object[] }) {
	const items = Array.isArray(data) ? data : [data];
	return (
		<>
			{items.map((item) => (
				<script
					key={(item as { "@type"?: string })["@type"] ?? JSON.stringify(item)}
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: static, self-authored JSON-LD
					dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
				/>
			))}
		</>
	);
}
