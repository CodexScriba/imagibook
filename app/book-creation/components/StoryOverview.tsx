// components/StoryOrverview.tsx

"use client";

import type React from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea"; // Assuming shadcn's Textarea is exported from this path
import { Label } from "@/components/ui/label";
import type { FormValues } from "@/app/context/schemas";
import * as m from "@/paraglide/messages";

const StoryOverview: React.FC = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormValues>();

	return (
		<div className="space-y-4">
			<Label htmlFor="storyOverview">{m.storyOverview_label()}</Label>
			<Textarea
				id="storyOverview"
				{...register("storyOverview")}
				placeholder={m.storyOverview_placeholder()}
				aria-invalid={!!errors.storyOverview}
				aria-describedby={
					errors.storyOverview ? "storyOverview-error" : undefined
				}
				className="resize-none h-44"
			/>
			{errors.storyOverview && (
				<p id="storyOverview-error" className="text-sm text-red-500">
					{errors.storyOverview.message}
				</p>
			)}
		</div>
	);
};

export default StoryOverview;
