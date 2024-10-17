// app/components/StoryOverview.tsx

"use client";

import type React from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
import * as m from "@/paraglide/messages";

const StoryOverview: React.FC = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<div className="w-full mt-4">
			<label
				htmlFor="storyOverview"
				className="block text-sm font-medium text-gray-700"
			>
				{m.storyOverview_label()}
			</label>
			<div className="mt-1">
				<Textarea
					id="storyOverview"
					{...register("storyOverview")}
					rows={5}
					placeholder={m.storyOverview_placeholder()}
				/>
			</div>
			{errors.storyOverview && (
				<p className="mt-2 text-sm text-red-600">
					{storyOverview_errors_maxLength}
				</p>
			)}
		</div>
	);
};

export default StoryOverview;
