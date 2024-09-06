import * as m from "@/paraglide/messages";
import { createServerMetadata } from "@/components/SEO";

export const metadata = createServerMetadata({
	title: m.homePageTitle(),
	description: m.homePageDescription(),
});

export default function Home() {
	return (
		<main>
			<h1>{m.test()}</h1>
		</main>
	);
}
//hello