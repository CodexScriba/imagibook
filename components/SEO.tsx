import type { Metadata } from "next";
import type { AvailableLanguageTag } from "@/paraglide/runtime";

type SEOProps = {
	title: string;
	description: string;
	canonical?: string;
};

// Server-side function
export function createServerMetadata({
	title,
	description,
	canonical,
}: SEOProps): Metadata {
	return {
		title: title,
		description: description,
		...(canonical && { alternates: { canonical: canonical } }),
	};
}

// Client-side component
export default function SEO({ title, description, canonical }: SEOProps) {
	return null; // This component doesn't render anything visible
}

// Helper function to generate alternate language URLs
export function generateAlternateLanguages(
	pathname: string,
): Record<AvailableLanguageTag, string> {
	return {
		en: `https://yourdomain.com${pathname}`,
		es: `https://yourdomain.com/es${pathname}`,
	};
}
