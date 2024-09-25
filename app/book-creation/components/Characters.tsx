// app/book-creation/components/Characters.tsx
"use client";

import type React from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, CheckCircle, XCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import * as m from "@/paraglide/messages";
import { useFormData } from "@/app/context/FormContext";

// Component to display error messages
const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => (
	<div className={`${message ? "h-6" : "h-0"} transition-all duration-200`}>
		{message && <p className="text-sm text-red-500">{message}</p>}
	</div>
);

// Component to display success messages
const SuccessMessage: React.FC<{ message?: string }> = ({ message }) => (
	<div className={`${message ? "h-6" : "h-0"} transition-all duration-200`}>
		{message && <p className="text-sm text-green-500">{message}</p>}
	</div>
);

// Main Characters component
const Characters: React.FC = () => {
	// Destructure needed functions and state from the form context
	const {
		control,
		register,
		formState: { errors },
		getFieldState,
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
			{fields.map((field, index) => {
				// Get the field state for validation and styling
				const nameFieldState = getFieldState(`characters.${index}.name`);
				const descriptionFieldState = getFieldState(
					`characters.${index}.description`,
				);

				// Determine if fields are valid
				const isNameValid = !nameFieldState.error && nameFieldState.isTouched;
				const isDescriptionValid =
					!descriptionFieldState.error && descriptionFieldState.isTouched;

				return (
					<div key={field.id} className="space-y-4">
						{/* Character name input */}
						<div className="flex items-center">
							<div className="flex-grow">
								<Label htmlFor={`character-name-${index}`}>
									{m.characters_labels_name()}
								</Label>
								<div className="relative">
									<Input
										id={`character-name-${index}`}
										{...register(`characters.${index}.name`)}
										placeholder={m.characters_placeholders_name()}
										className={`w-full ${
											nameFieldState.error
												? "border-red-500"
												: isNameValid
													? "border-green-500"
													: ""
										}`}
									/>
									{/* Display validation icons */}
									{nameFieldState.error && (
										<XCircle className="absolute right-2 top-2 text-red-500" />
									)}
									{isNameValid && (
										<CheckCircle className="absolute right-2 top-2 text-green-500" />
									)}
								</div>
								{/* Display error or success messages */}
								<ErrorMessage
									message={errors.characters?.[index]?.name?.message}
								/>
								{isNameValid && <SuccessMessage message="Name looks good!" />}
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
									className={`${
										fields.length <= 1
											? "text-gray-400 cursor-not-allowed"
											: "text-red-500"
									} text-xl font-bold`}
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
									className={`w-full ${
										descriptionFieldState.error
											? "border-red-500"
											: isDescriptionValid
												? "border-green-500"
												: ""
									}`}
								/>
								{/* Display validation icons */}
								{descriptionFieldState.error && (
									<XCircle className="absolute right-2 top-2 text-red-500" />
								)}
								{isDescriptionValid && (
									<CheckCircle className="absolute right-2 top-2 text-green-500" />
								)}
							</div>
							{/* Display error or success messages */}
							<ErrorMessage
								message={errors.characters?.[index]?.description?.message}
							/>
							{isDescriptionValid && (
								<SuccessMessage message="Description looks good!" />
							)}
						</div>
					</div>
				);
			})}
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
