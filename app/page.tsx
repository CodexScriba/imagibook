import * as m from "@/paraglide/messages";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
	return (
		<div className="bg-background">
			<Navbar/>
			<h1>{m.greeting()}</h1>
			<p>{m.testMessage()}</p>
		</div>
	);
}
