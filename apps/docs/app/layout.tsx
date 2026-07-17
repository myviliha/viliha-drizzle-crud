import "./global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata = {
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL ?? "https://nestjs-drizzle-crud.vercel.app",
	),
	title: {
		default: "nestjs-drizzle-crud",
		template: "%s · nestjs-drizzle-crud",
	},
	description:
		"Type-safe CRUD for Drizzle ORM in NestJS — configure once, every entity gets full CRUD.",
	openGraph: {
		type: "website",
		siteName: "nestjs-drizzle-crud",
	},
	twitter: { card: "summary_large_image" },
};

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={inter.variable}
		>
			<body className="flex flex-col min-h-screen font-sans">
				<RootProvider search={{ options: { type: "static" } }}>
					{children}
				</RootProvider>
			</body>
		</html>
	);
}
