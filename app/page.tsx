import * as m from "@/paraglide/messages";
import { createServerMetadata } from "@/components/SEO";
import Navbar from "./components/Navbar/Navbar";

export const metadata = createServerMetadata({
	title: m.homePageTitle(),
	description: m.homePageDescription(),
});

export default function Home() {
	return (
		<main>
			<Navbar/>
		</main>
	);
}
