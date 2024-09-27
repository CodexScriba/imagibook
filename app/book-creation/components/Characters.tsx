// components/Characters.tsx

"use client";

import type React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import * as m from "@/paraglide/messages";
import type { FormValues } from "@/app/context/schemas";

// Component to display error messages
const ErrorMessage: React.FC<{ id?: string; message?: string }> = ({
	id,
	message,
}) => (
	<p
		id={id}
		className={`${
			message ? "h-6" : "h-0"
		} transition-all duration-200 text-sm text-red-500`}
	>
		{message}
	</p>
);

// Main Characters component
const Characters: React.FC = () => {
	const {
		control,
		register,
		formState: { errors },
	} = useFormContext<FormValues>();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "characters",
	});

	const handleRemove = (index: number) => {
		if (fields.length > 1) {
			remove(index);
		}
	};

	return (
		<div className="space-y-6">
			{fields.map((field, index) => (
				<div key={field.id} className="space-y-4">
					{/* Name Field */}
					<div className="flex items-start">
						<div className="flex-grow">
							<Label htmlFor={`characters.${index}.name`}>
								{m.characters_labels_name()}
							</Label>
							<div className="relative">
								<Input
									id={`characters.${index}.name`}
									{...register(`characters.${index}.name`)}
									placeholder={m.characters_placeholders_name()}
									className="w-full"
									aria-invalid={!!errors.characters?.[index]?.name}
									aria-describedby={
										errors.characters?.[index]?.name
											? `characters.${index}.name-error`
											: undefined
									}
								/>
							</div>
							{/* Error Message for Name */}
							<ErrorMessage
								id={`characters.${index}.name-error`}
								message={errors.characters?.[index]?.name?.message}
							/>
						</div>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => handleRemove(index)}
							className="ml-1 mt-6"
							aria-label={m.characters_buttons_remove()}
							disabled={fields.length <= 1}
						>
							<X
								className={`text-xl font-bold ${
									fields.length <= 1 ? "text-gray-400" : "text-red-500"
								}`}
							/>
							<span className="sr-only">{m.characters_buttons_remove()}</span>
						</Button>
					</div>

					{/* Description Field */}
					<div className="w-full">
						<Label htmlFor={`characters.${index}.description`}>
							{m.characters_labels_description()}
						</Label>
						<div className="relative">
							<Textarea
								id={`characters.${index}.description`}
								{...register(`characters.${index}.description`)}
								placeholder={m.characters_placeholders_description()}
								className="w-full"
								aria-invalid={!!errors.characters?.[index]?.description}
							/>
						</div>
						{/* No Error Message for Description */}
					</div>
				</div>
			))}

			{/* Array-level Error Message */}
			{errors.characters?.message && (
				<ErrorMessage message={errors.characters.message} />
			)}

			{/* Add Character Button */}
			<div className="flex justify-center mt-4">
				<Button
					type="button"
					variant="secondary"
					size="lg"
					onClick={() => append({ name: "", description: "" })}
					className="w-full max-w-sm"
				>
					<Plus className="h-5 w-5 mr-2" />
					{m.characters_buttons_add()}
				</Button>
			</div>
		</div>
	);
};

export default Characters;
