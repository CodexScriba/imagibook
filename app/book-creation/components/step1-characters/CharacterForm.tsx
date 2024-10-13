// components/CharacterForm.tsx

import type React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import * as m from "@/paraglide/messages";
import { FieldErrorMessage } from "@/components/ErrorMessage";
import type { FormValues } from "@/app/context/schemas";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ageGroups } from "@/constants/ageGroups";

interface CharacterFormProps {
	index: number;
	handleRemove: (index: number) => void;
	totalFields: number;
}

const CharacterForm: React.FC<CharacterFormProps> = ({
	index,
	handleRemove,
	totalFields,
}) => {
	const {
		control,
		register,
		watch,
		formState: { errors },
	} = useFormContext<FormValues>();

	return (
		<div className="space-y-6 p-6 border rounded-lg shadow-sm bg-white">
			{/* Name Field */}
			<div>
				<Label htmlFor={`characters.${index}.name`}>
					{m.characters_labels_name()}
				</Label>
				<Input
					id={`characters.${index}.name`}
					{...register(`characters.${index}.name`)}
					placeholder={m.characters_placeholders_name()}
					aria-invalid={!!errors.characters?.[index]?.name}
					aria-describedby={
						errors.characters?.[index]?.name
							? `characters.${index}.name-error`
							: undefined
					}
				/>
				{/* Error Message for Name */}
				<FieldErrorMessage
					id={`characters.${index}.name-error`}
					message={errors.characters?.[index]?.name?.message}
				/>
			</div>

			{/* Age Group Select */}
			<Controller
				control={control}
				name={`characters.${index}.ageGroup` as const}
				render={({ field }) => (
					<div>
						<Label htmlFor={`characters.${index}.ageGroup`}>
							{m.characters_labels_ageGroup()}
						</Label>
						<Select
							value={field.value}
							onValueChange={(value) => {
								field.onChange(value);
							}}
						>
							<SelectTrigger id={`characters.${index}.ageGroup`}>
								<SelectValue
									placeholder={m.characters_placeholders_ageGroup()}
								/>
							</SelectTrigger>
							<SelectContent>
								{ageGroups.map((ageGroup) => (
									<SelectItem key={ageGroup.value} value={ageGroup.value}>
										{ageGroup.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				)}
			/>

			{/* isMainCharacter Switch */}
			<div className="flex items-center mt-2">
				<Controller
					control={control}
					name={`characters.${index}.isMainCharacter`}
					render={({ field }) => (
						<>
							<Switch
								id={`characters.${index}.isMainCharacter`}
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
							<Label
								htmlFor={`characters.${index}.isMainCharacter`}
								className="ml-2"
							>
								{m.characters_labels_isMainCharacter()}
							</Label>
						</>
					)}
				/>
			</div>

			{/* Description Field */}
			<div>
				<Label htmlFor={`characters.${index}.description`}>
					{m.characters_labels_description()}
				</Label>
				<Textarea
					id={`characters.${index}.description`}
					{...register(`characters.${index}.description`)}
					placeholder={m.characters_placeholders_description()}
				/>
			</div>

			{/* Remove Button */}
			<Button
				variant="ghost"
				size="sm"
				onClick={() => handleRemove(index)}
				disabled={totalFields <= 1}
				className="text-red-500 hover:text-red-700"
				aria-label={`Remove ${watch(`characters.${index}.name`) || "Character"}`}
			>
				<X className="w-5 h-5" />
			</Button>
		</div>
	);
};

export default CharacterForm;
