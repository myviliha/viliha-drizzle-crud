import { Tab, Tabs } from "fumadocs-ui/components/tabs";

function buildCommand(pm: string, packages: string[]): string {
	const joined = packages.join(" ");
	if (pm === "pnpm") return `pnpm add ${joined}`;
	if (pm === "npm") return `npm install ${joined}`;
	if (pm === "yarn") return `yarn add ${joined}`;
	return `bun add ${joined}`;
}

export function InstallTabs({ packages }: { packages: string[] }) {
	const items = ["pnpm", "npm", "yarn", "bun"] as const;
	return (
		<Tabs items={[...items]} defaultIndex={0}>
			{items.map((pm) => (
				<Tab key={pm} value={pm}>
					<pre className="my-0 rounded-lg border border-fd-border bg-fd-card px-4 py-3 text-sm font-mono text-fd-foreground overflow-x-auto">
						<code>{buildCommand(pm, packages)}</code>
					</pre>
				</Tab>
			))}
		</Tabs>
	);
}
