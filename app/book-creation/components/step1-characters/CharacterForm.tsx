// app/book-creation/components/step1-characters/CharacterForm.tsx

import type React from "react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { X, ChevronsUpDown, Check } from "lucide-react";
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
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { animalSuggestions } from "@/constants/IllustrationData";
import { Separator } from "@/components/ui/separator";

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
		setValue,
		formState: { errors },
	} = useFormContext<FormValues>();

	// Watch fields specific to the current character
	const characterType = watch(`characters.${index}.characterType`) || "animal";
	const animalType = watch(`characters.${index}.animalType`) || "";
	const isAnthropomorphic =
		watch(`characters.${index}.isAnthropomorphic`) || false;

	// State to manage the visibility of popovers
	const [openCharacterType, setOpenCharacterType] = useState(false);
	const [openAnimalType, setOpenAnimalType] = useState(false);

	// Local state for animalType input to handle dynamic suggestions
	const [animalTypeInput, setAnimalTypeInput] = useState(animalType);

	// Mapping object for character type labels
	const characterTypeLabels: Record<"human" | "animal", () => string> = {
		human: m.characterType_human,
		animal: m.characterType_animal,
	};

	return (
		/* 
      Container for the character form.
      'relative' class is added to position the delete button.
    */
		<div className="space-y-6 p-6 relative">
			<Separator />
			{/* 
        Remove Button positioned at the top right corner.
        Disabled if there's only one character left.
      */}
			<Button
				variant="ghost"
				size="sm"
				onClick={() => handleRemove(index)}
				disabled={totalFields <= 1}
				className="text-red-500 hover:text-red-700 absolute top-2 right-2"
				aria-label={`Remove ${watch(`characters.${index}.name`) || "Character"}`}
			>
				<X className="w-5 h-5" />
			</Button>

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

			{/* Character Type Selection */}
			<div>
				<Label
					htmlFor={`characters.${index}.characterType`}
					className="text-foreground"
				>
					{m.characterType_label()}
				</Label>
				<Popover open={openCharacterType} onOpenChange={setOpenCharacterType}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							aria-expanded={openCharacterType}
							className="w-full justify-between"
						>
							{characterType
								? characterTypeLabels[characterType]()
								: m.characterType_placeholder()}
							<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-full p-0">
						<Command>
							<CommandInput placeholder={m.characterType_placeholder()} />
							<CommandList>
								<CommandEmpty>{m.characterType_noOptions()}</CommandEmpty>
								<CommandGroup>
									<CommandItem
										value="human"
										onSelect={(value: string) => {
											if (value === "human" || value === "animal") {
												setValue(`characters.${index}.characterType`, value);
												setOpenCharacterType(false);
											}
										}}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												characterType === "human" ? "opacity-100" : "opacity-0",
											)}
										/>
										{m.characterType_human()}
									</CommandItem>
									<CommandItem
										value="animal"
										onSelect={(value: string) => {
											if (value === "human" || value === "animal") {
												setValue(`characters.${index}.characterType`, value);
												setOpenCharacterType(false);
											}
										}}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												characterType === "animal"
													? "opacity-100"
													: "opacity-0",
											)}
										/>
										{m.characterType_animal()}
									</CommandItem>
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			{/* Animal Type Selection (Visible only if characterType is 'animal') */}
			{characterType === "animal" && (
				<>
					<div>
						<Label
							htmlFor={`characters.${index}.animalType`}
							className="text-foreground"
						>
							{m.animalType_label()}
						</Label>
						<Popover open={openAnimalType} onOpenChange={setOpenAnimalType}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									aria-expanded={openAnimalType}
									className="w-full justify-between"
								>
									{animalTypeInput || m.animalType_placeholder()}
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-full p-0">
								<Command>
									<CommandInput
										placeholder={m.animalType_placeholder()}
										value={animalTypeInput}
										onValueChange={(value: string) => {
											setAnimalTypeInput(value);
											setValue(`characters.${index}.animalType`, value);
										}}
									/>
									<CommandList>
										<CommandEmpty>{m.animalType_noOptions()}</CommandEmpty>
										<CommandGroup>
											{animalSuggestions.map((animal) => (
												<CommandItem
													key={animal}
													value={animal}
													onSelect={(currentValue: string) => {
														setAnimalTypeInput(currentValue);
														setValue(
															`characters.${index}.animalType`,
															currentValue,
														);
														setOpenAnimalType(false);
													}}
												>
													<Check
														className={cn(
															"mr-2 h-4 w-4",
															animalTypeInput === animal
																? "opacity-100"
																: "opacity-0",
														)}
													/>
													{animal}
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</div>

					{/* Anthropomorphic Switch */}
					<div className="flex items-center space-x-2">
						<Switch
							id={`characters.${index}.isAnthropomorphic`}
							checked={isAnthropomorphic}
							onCheckedChange={(checked) =>
								setValue(`characters.${index}.isAnthropomorphic`, checked)
							}
						/>
						<Label
							htmlFor={`characters.${index}.isAnthropomorphic`}
							className="flex items-center space-x-1 text-foreground"
						>
							<span>{m.isAnthropomorphic_label()}</span>
							<span className="text-sm text-gray-500">
								{m.isAnthropomorphic_description()}
							</span>
						</Label>
					</div>
				</>
			)}

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
		</div>
	);
};

export default CharacterForm;
