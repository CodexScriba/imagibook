import * as m from "@/paraglide/messages";
import { createServerMetadata } from "@/components/SEO";
import Navbar from "./components/Navbar/Navbar";
import DesktopNavbar from "./components/Navbar/DesktopNavbar";

export const metadata = createServerMetadata({
	title: m.homePageTitle(),
	description: m.homePageDescription(),
});

export default function Home() {
	return (
		<main className="mt-6">
			<Navbar/>
		</main>
	);
}
