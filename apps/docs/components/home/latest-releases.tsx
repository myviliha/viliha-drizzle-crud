import Link from "next/link";
import { ArrowRight } from "lucide-react";

const RELEASES = [
	{
		version: "3.1.0",
		date: "Jun 29, 2026",
		title: "findAll and count support list search",
		body: "Pass options.search to search across configured columns while keeping filters, pagination, sorting, relation filters, and total count in the same query path.",
	},
	{
		version: "3.0.4",
		date: "Jun 21, 2026",
		title: "Bad client input maps to 400",
		body: "Postgres data exceptions such as too-long values, CHECK violations, and numeric overflow now map to ValidationFailedException instead of leaking as raw 500s.",
	},
	{
		version: "3.0.3",
		date: "Jun 20, 2026",
		title: "Case-insensitive string filters are exact",
		body: "A bare-string filter now compiles to lower(col) = lower(val). The % / _ / \\ characters in the value are treated as literal data, not wildcards.",
	},
];

export function LatestReleases() {
	return (
		<div className="space-y-3">
			{RELEASES.map((r) => (
				<Link
					key={r.version}
					href="/docs/changelog"
					className="block rounded-lg border border-[var(--fd-border-muted)] bg-[var(--fd-surface-muted)] p-5 text-fd-foreground transition-colors hover:border-[var(--fd-border-hover)] hover:bg-fd-accent/40"
				>
					<div className="mb-1.5 flex items-baseline gap-2">
						<span className="text-base font-semibold tracking-[-0.198px] text-fd-foreground">
							{r.title}
						</span>
						<span className="ml-auto rounded-[2px] border border-[var(--fd-border-muted)] bg-fd-background px-1.5 py-0.5 text-xs font-medium text-[var(--color-fd-primary)]">
							v{r.version}
						</span>
					</div>
					<div className="text-xs text-fd-muted-foreground">{r.date}</div>
					<p className="mt-2.5 text-sm leading-relaxed text-fd-muted-foreground">
						{r.body}
					</p>
				</Link>
			))}
			<div className="pt-1 text-center">
				<Link
					href="/docs/changelog"
					className="inline-flex items-center gap-1 text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
				>
					Full changelog <ArrowRight className="size-3.5" />
				</Link>
			</div>
		</div>
	);
}
