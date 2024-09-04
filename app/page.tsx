import * as m from "@/paraglide/messages";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
	return (
		<div className="bg-background">
			<Navbar />
			<p>{m.test()}</p>
			<p>{m.navbarAboutUs()}</p>
			<p>{m.navbarLibrary()}</p>
		</div>
	);
}
