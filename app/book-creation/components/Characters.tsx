"use client";

import type React from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import * as m from "@/paraglide/messages";
import { useFormData } from "@/app/context/FormContext";

// Component to display error messages
const ErrorMessage: React.FC<{ id?: string; message?: string }> = ({
	id,
	message,
}) => (
	<p
		id={id}
		className={`${message ? "h-6" : "h-0"} transition-all duration-200 text-sm text-red-500`}
	>
		{message}
	</p>
);
// Main Characters component
const Characters: React.FC = () => {
	// Destructure needed functions and state from the form context
	const {
		control,
		register,
		formState: { errors },
	} = useFormData();

	// Set up the field array for managing multiple character inputs
	const { fields, append, remove } = useFieldArray({
		control,
		name: "characters",
	});

	// Function to handle removing a character field
	const handleRemove = (index: number) => {
		if (fields.length > 1) {
			remove(index);
		}
	};

	return (
		<div className="space-y-6">
			{/* Map through each character field */}
			{fields.map((field, index) => (
				<div key={field.id} className="space-y-4">
					{/* Character name input */}
					<div className="flex items-start">
						<div className="flex-grow">
							<Label htmlFor={`character-name-${index}`}>
								{m.characters_labels_name()}
							</Label>
							<div className="relative">
								<Input
									id={`character-name-${index}`}
									{...register(`characters.${index}.name`)}
									placeholder={m.characters_placeholders_name()}
									className="w-full"
									aria-invalid={!!errors.characters?.[index]?.name}
									aria-describedby={
										errors.characters?.[index]?.name
											? `character-name-${index}-error`
											: undefined
									}
								/>
							</div>
							<ErrorMessage
								id={`character-name-${index}-error`}
								message={errors.characters?.[index]?.name?.message}
							/>
						</div>
						{/* Remove character button */}
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
					{/* Character description input */}
					<div className="w-full">
						<Label htmlFor={`character-description-${index}`}>
							{m.characters_labels_description()}
						</Label>
						<div className="relative">
							<Textarea
								id={`character-description-${index}`}
								{...register(`characters.${index}.description`)}
								placeholder={m.characters_placeholders_description()}
								className="w-full"
								aria-invalid={!!errors.characters?.[index]?.description}
								aria-describedby={
									errors.characters?.[index]?.description
										? `character-description-${index}-error`
										: undefined
								}
							/>
						</div>
						<ErrorMessage
							id={`character-description-${index}-error`}
							message={errors.characters?.[index]?.description?.message}
						/>
					</div>
				</div>
			))}
			{/* Display general error message for characters if any */}
			{errors.characters?.message && (
				<ErrorMessage message={errors.characters.message} />
			)}
			{/* Add new character button */}
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
