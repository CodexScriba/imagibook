import type React from "react";
import {
	useFieldArray,
	useFormContext,
	type FieldErrors,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, UserPlus } from "lucide-react";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import * as m from "@/paraglide/messages";

// Define validation schema using Zod
const characterSchema = z.object({
	name: z.string().nonempty(m.characters_errors_nameRequired()), // Require name
	description: z.string().optional(),
});

export const charactersSchema = z
	.array(characterSchema)
	.min(1, m.characters_errors_atLeastOne()); // At least one character

type CharacterFormData = z.infer<typeof charactersSchema>;

const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
	return (
		<div className={`${message ? "h-6" : "h-0"} transition-all duration-200`}>
			{message && <p className="text-sm text-red-500">{message}</p>}
		</div>
	);
};

const Characters: React.FC = () => {
	const {
		control,
		register,
		formState: { errors },
	} = useFormContext<{ characters: CharacterFormData }>();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "characters",
	});

	const characterErrors = errors.characters as FieldErrors<CharacterFormData>;

	// Function to handle removal with a check
	const handleRemove = (index: number) => {
		if (fields.length > 1) {
			remove(index);
		}
	};

	return (
		<div className="space-y-4">
			<legend className="text-lg font-semibold flex space-x-1">
				<span>{m.characters_legend()}</span>
				<UserPlus className="mt-1 w-5 h-5" />
			</legend>
			<p className="text-sm text-muted-foreground">
				{m.characters_description()}
			</p>
			{/* Labels displayed once */}
			<div className="grid grid-cols-[2fr_3fr_auto] gap-4">
				<div className="relative">
					<Label>{m.characters_labels_name()}</Label>
				</div>
				<div className="relative">
					<Label>{m.characters_labels_description()}</Label>
				</div>
			</div>
			{fields.map((field, index) => (
				<div
					key={field.id}
					className="grid grid-cols-[2fr_3fr_auto] gap-4 items-start mt-1"
				>
					{/* Name Input Field with Reduced Width */}
					<div className="flex flex-col">
						<div className="flex items-center">
							<Input
								id={`character-name-${index}`}
								{...register(`characters.${index}.name`)}
								placeholder={m.characters_placeholders_name()}
								className="w-3/4"
							/>
							{/* Ghost Delete Button next to Name Input */}
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => handleRemove(index)}
								className="ml-1"
								aria-label={m.characters_buttons_remove()}
								disabled={fields.length <= 1} // Disable when only one field
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
						<ErrorMessage message={characterErrors?.[index]?.name?.message} />
					</div>

					{/* Description Input Field */}
					<div className="flex flex-col">
						<Input
							id={`character-description-${index}`}
							{...register(`characters.${index}.description`)}
							placeholder={m.characters_placeholders_description()}
						/>
						<ErrorMessage
							message={characterErrors?.[index]?.description?.message}
						/>
					</div>
				</div>
			))}
			{/* Display Root Error */}
			{characterErrors?.root?.message && (
				<ErrorMessage message={characterErrors.root.message} />
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
