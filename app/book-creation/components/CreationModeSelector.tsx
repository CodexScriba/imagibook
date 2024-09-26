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

const CreationModeSelector: React.FC = () => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext();
	const mode = watch("mode");

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

	return (
		<fieldset className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{options.map((item) => (
					<Card
						key={item.id}
						className={`cursor-pointer transition-all ${
							mode === item.id ? "border-primary" : ""
						}`}
						data-testid={`${item.id}-card`}
					>
						<label className="block h-full cursor-pointer">
							<CardHeader className="py-2">
								<CardTitle
									className={`flex items-center font-semibold ${
										mode === item.id ? "text-lg" : "text-sm"
									}`}
									id={`${item.id}-label`}
								>
									<item.icon className="w-5 h-5 mr-2" />
									{item.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="py-2">
								<CardDescription
									className={`${mode === item.id ? "text-base" : "text-xs"}`}
								>
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
			{errors.mode && (
				<p className="text-sm text-red-500 mt-2">{errors.mode.message}</p>
			)}
		</fieldset>
	);
};

export default CreationModeSelector;
