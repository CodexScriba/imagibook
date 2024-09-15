import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Wand2, BookOpen } from "lucide-react";
import * as m from "@/paraglide/messages";

interface CreationModeSelectorProps {
	mode: "magicWand" | "storybookStudio";
	onModeChange: (mode: "magicWand" | "storybookStudio") => void;
}

const CreationModeSelector: React.FC<CreationModeSelectorProps> = ({
	mode = "magicWand", // Default to magicWand mode
	onModeChange,
}) => {
	return (
		<div className="space-y-4">
			<h2 className="text-lg font-semibold">{m.selectCreationMode()}</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card
					className={`cursor-pointer transition-all ${
						mode === "magicWand" ? "border-primary" : ""
					}`}
					onClick={() => onModeChange("magicWand")}
				>
					<CardHeader className="py-2">
						{" "}
						{/* Reduced padding here */}
						<CardTitle className="flex items-center text-sm font-semibold">
							<Wand2 className="w-5 h-5 mr-2" />
							{m.magicWandMode()}
						</CardTitle>
					</CardHeader>
					<CardContent className="py-2">
						{" "}
						{/* Reduced padding here */}
						<CardDescription className="text-xs">
							{m.magicWandDescription()}
						</CardDescription>
					</CardContent>
				</Card>

				<Card
					className={`cursor-pointer transition-all ${
						mode === "storybookStudio" ? "border-primary" : ""
					}`}
					onClick={() => onModeChange("storybookStudio")}
				>
					<CardHeader className="py-2">
						{" "}
						{/* Reduced padding here */}
						<CardTitle className="flex items-center text-sm font-semibold">
							<BookOpen className="w-5 h-5 mr-2" />
							{m.storybookStudioMode()}
						</CardTitle>
					</CardHeader>
					<CardContent className="py-2">
						{" "}
						{/* Reduced padding here */}
						<CardDescription className="text-xs">
							{m.storybookStudioDescription()}
						</CardDescription>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default CreationModeSelector;
