// components/CreationModeSelector.tsx

"use client";

import type React from "react";
import { useFormContext } from "react-hook-form";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Wand2, BookOpen } from "lucide-react";
import * as m from "@/paraglide/messages";
import type { FormValues } from "@/app/context/schemas";

/**
 * Imports a set of UI components for rendering a card-like layout.
 * These components include:
 * - `Card`: The main container for the card.
 * - `CardContent`: The content area inside the card.
 * - `CardHeader`: The header section of the card.
 * - `CardTitle`: The title element within the card header.
 * - `CardDescription`: The description element within the card.
 * These components can be used to create a consistent and visually appealing card-based UI in the application.
 */

const CreationModeSelector: React.FC = () => {
	const { register, watch, setValue, formState } = useFormContext<FormValues>();
	const mode = watch("mode") || "";

	const options = [
		{
			id: "magicWand",
			title: m.creationMode_magicWand_title(),
			description: m.creationMode_magicWand_description(),
			icon: Wand2,
		},
		{
			id: "storybookStudio",
			title: m.creationMode_storybookStudio_title(),
			description: m.creationMode_storybookStudio_description(),
			icon: BookOpen,
		},
	];

	const handleCardClick = (id: "magicWand" | "storybookStudio") => {
		setValue("mode", id, { shouldValidate: true });
	};
	return (
		<fieldset className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{options.map((item) => (
					<Card
						key={item.id}
						className={`cursor-pointer transition-all duration-300 ease-in-out ${
							mode === item.id
								? "border-2 border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
								: "border border-gray-300 hover:border-purple-300"
						}`}
						data-testid={`${item.id}-card`}
						onClick={() =>
							handleCardClick(item.id as "magicWand" | "storybookStudio")
						}
					>
						<label className="block h-full cursor-pointer">
							<CardHeader className="py-2">
								<CardTitle
									className="flex items-center font-semibold text-lg"
									id={`${item.id}-label`}
								>
									<item.icon className="w-5 h-5 mr-2" />
									{item.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="py-2">
								<CardDescription className="text-base">
									{item.description}
								</CardDescription>
								<input
									type="radio"
									id={item.id}
									value={item.id}
									{...register("mode")}
									className="sr-only"
									aria-labelledby={`${item.id}-label`}
								/>
							</CardContent>
						</label>
					</Card>
				))}
			</div>
			{formState.errors.mode && (
				<p className="text-sm text-red-500 mt-2">
					{formState.errors.mode.message}
				</p>
			)}
		</fieldset>
	);
};

export default CreationModeSelector;
