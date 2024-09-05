import { LanguageProvider } from "@inlang/paraglide-next";
import { languageTag } from "@/paraglide/runtime.js";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { createServerMetadata } from "@/components/SEO";
import * as m from "@/paraglide/messages";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	display: "swap",
});

export const metadata: Metadata = createServerMetadata({
	title: m.siteTitle(),
	description: m.siteDescription(),
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<LanguageProvider>
			<html lang={languageTag()} suppressHydrationWarning>
				<body className={poppins.className}>{children}</body>
			</html>
		</LanguageProvider>
	);
}
