import * as m from "@/paraglide/messages";

export default function Home() {
	return (
		<div className="bg-background text-foreground p-8 rounded-lg">
			<h1 className="text-primary text-3xl font-bold mb-4">
				Craft magical personalized stories with Imagibook's AI
			</h1>
			<h2 className="text-secondary text-2xl font-semibold mb-4">
				Turn moments into illustrated, multilingual adventures with just a few
				sentences.
			</h2>
			<p className="text-muted text-lg">Start your journey today!</p>
		</div>
	);
}
