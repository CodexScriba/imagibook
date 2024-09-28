// components/StoryOverview.tsx
"use client";

import type React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea"; // Adjust the import path as needed
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react"; // Example icon import
import { cn } from "@/lib/utils"; // Utility for conditional classNames
import * as m from "@/paraglide/messages"; // Importing internationalized messages

const StoryOverview: React.FC = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<div className="space-y-4">
			<legend className="text-lg font-semibold flex items-center space-x-2">
				<BookOpen className="w-5 h-5" />
				<span>{m.storyOverview_label()}</span>
			</legend>
			<p className="text-sm text-muted-foreground">
				{m.storyOverview_description()}
			</p>
			<Controller
				name="storyOverview"
				control={control}
				render={({ field }) => (
					<Textarea
						{...field}
						id="storyOverview"
						placeholder={m.storyOverview_example()}
						className={cn(
							"mt-1",
							errors.storyOverview ? "border-red-500" : "border-gray-300",
						)}
						rows={6}
					/>
				)}
			/>
			{errors.storyOverview && (
				<p className="text-sm text-red-600">
					{m.storyOverview_errors_minLength()}
				</p>
			)}
		</div>
	);
};

export default StoryOverview;
