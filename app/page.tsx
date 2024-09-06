import * as m from "@/paraglide/messages";
import { createServerMetadata } from "@/components/SEO";
import LanguageSwitcher from "./components/Navbar/LanguageSwitcher";

export const metadata = createServerMetadata({
	title: m.homePageTitle(),
	description: m.homePageDescription(),
});

export default function Home() {
	return (
		<main>
			<LanguageSwitcher />
			<h1> {m.navbarLang()} </h1>
		</main>
	);
}
