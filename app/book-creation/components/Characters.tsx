import type React from "react";
import {
	useFieldArray,
	useFormContext,
	type FieldErrors,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, UserPlus } from "lucide-react";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import * as m from "@/paraglide/messages";

const characterSchema = z.object({
	name: z.string().nonempty(m.characters_errors_nameRequired()),
	description: z.string().optional(),
});

export const charactersSchema = z
	.array(characterSchema)
	.min(1, m.characters_errors_atLeastOne());

type CharacterFormData = z.infer<typeof charactersSchema>;

const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
	return message ? <p className="text-sm text-red-500">{message}</p> : null;
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

	return (
		<div className="space-y-4">
			<legend className="text-lg font-semibold flex space-x-1">
				<span>{m.characters_legend()}</span>
				<UserPlus className="mt-1 w-5 h-5" />
			</legend>
			<p className="text-sm text-muted-foreground">
				{m.characters_description()}
			</p>

			{/* Consolidated Labels */}
			<div className="grid grid-cols-2 gap-4 font-semibold">
				<Label htmlFor="character-name">{m.characters_labels_name()}</Label>
				<Label htmlFor="character-description">
					{m.characters_labels_description()}
				</Label>
			</div>

			{/* Character Fields */}
			{fields.map((field, index) => (
				<div key={field.id} className="flex items-center space-x-4">
					<Input
						id={`character-name-${index}`}
						{...register(`characters.${index}.name`)}
						placeholder={m.characters_placeholders_name()}
						className="flex-1"
					/>
					<Input
						id={`character-description-${index}`}
						{...register(`characters.${index}.description`)}
						placeholder={m.characters_placeholders_description()}
						className="flex-1"
					/>
					{/* Show remove button only if there are at least two fields */}
					{fields.length > 1 && (
						<Button
							type="button"
							variant="destructive"
							size="icon"
							onClick={() => remove(index)}
							aria-label={m.characters_buttons_remove()}
							className="h-8 w-8 p-0"
						>
							<Minus className="h-4 w-4" />
						</Button>
					)}
				</div>
			))}

			{/* Display Field Errors */}
			{characterErrors?.root?.message && (
				<ErrorMessage message={characterErrors.root.message} />
			)}
			{fields.map(
				(field, index) =>
					characterErrors?.[index]?.name?.message && (
						<ErrorMessage
							key={field.id}
							message={characterErrors[index].name.message}
						/>
					),
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
