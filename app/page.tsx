import * as m from "@/paraglide/messages";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
	return (
		<div className="bg-background">
			<h1>{m.greeting()}</h1>
			<p>{m.testMessage()}</p>
			<h2>{m.testMessage()}</h2>
		</div>
	);
}
