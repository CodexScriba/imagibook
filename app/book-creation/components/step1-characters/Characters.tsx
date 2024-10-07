// components/Characters.tsx

"use client";

import type React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import * as m from "@/paraglide/messages";
import type { FormValues } from "@/app/context/schemas";
import { Switch } from "@/components/ui/switch";
import { FieldErrorMessage } from "@/components/ErrorMessage";
import { AgeGroupSelect } from "./AgeGroupSelect";

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
					{/* Name Field, Age Group Select, and Remove Button */}
					<div className="flex items-start space-x-4">
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
							<FieldErrorMessage
								id={`characters.${index}.name-error`}
								message={errors.characters?.[index]?.name?.message}
							/>
						</div>
						<div className="flex-grow">
							<AgeGroupSelect control={control} index={index} />
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

					{/* isMainCharacter Switch */}
					<div className="flex items-center mt-2">
						<Controller
							control={control}
							name={`characters.${index}.isMainCharacter` as const}
							render={({ field }) => (
								<>
									<Switch
										id={`characters.${index}.isMainCharacter`}
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
									<Label
										htmlFor={`characters.${index}.isMainCharacter`}
										className="ml-2 whitespace-nowrap"
									>
										{m.characters_labels_isMainCharacter()}
									</Label>
								</>
							)}
						/>
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
								// Removed aria-invalid for optional field
							/>
						</div>
						{/* No Error Message for Description */}
					</div>
				</div>
			))}

			{/* Array-level Error Message */}
			{errors.characters?.message && (
				<FieldErrorMessage message={errors.characters.message} />
			)}

			{/* Add Character Button */}
			<div className="flex justify-center mt-4">
				<Button
					type="button"
					variant="secondary"
					size="lg"
					onClick={() =>
						append({
							name: "",
							isMainCharacter: fields.length === 0, // Set to true only if it's the first character
							ageGroup: "",
							description: "",
						})
					}
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
