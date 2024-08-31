import * as m from "@/paraglide/messages";

export default function Home() {
	return (
		<div>
			<h1>{m.greeting({ name: "World" })}</h1>
		</div>
	);
}
