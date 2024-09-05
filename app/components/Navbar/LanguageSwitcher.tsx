import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import * as m from "@/paraglide/messages";

// Define an array of supported languages
// If you want to add or remove languages, do it
const languages = [
	{ code: "en", name: "English" },
	{ code: "es", name: "Español" },
];

export default function LanguageSwitcher() {
	// Get the current pathname using the usePathname hook from next/navigation
	const pathname = usePathname();

	// Extract the current language code from the URL
	// This assumes your routes are structured as /[lang]/[...rest]
	const currentLang = pathname.split("/")[1];

	// This function generates the new pathname for a given language
	// It replaces the language code in the current URL with the new one
	const redirectedPathname = (locale: string) => {
		if (!pathname) return "/";
		const segments = pathname.split("/");
		segments[1] = locale;
		return segments.join("/");
	};

	return (
		<Select defaultValue={currentLang}>
			<SelectTrigger className="w-[140px] text-[color:var(--foreground)] dark:text-[color:var(--foreground)]">
				<SelectValue placeholder={m.navbarLang} />
				<Globe className="ml-2 h-4 w-4" />
			</SelectTrigger>
			<SelectContent>
				{languages.map((lang) => (
					<SelectItem key={lang.code} value={lang.code}>
						<Link href={redirectedPathname(lang.code)}>{lang.name}</Link>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
