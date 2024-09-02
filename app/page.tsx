import * as m from "@/paraglide/messages";

export default function Home() {
	return (
		<div className="bg-background">
			<h1>{m.greeting()}</h1>
			<p>{m.testMessage()}</p>
		</div>
	);
}
