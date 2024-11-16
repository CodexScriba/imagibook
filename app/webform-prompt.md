Enter your prompt here:

Context:

Our project, ImagiBook.ai, is a multi-page React application that enables users to generate stories through a series of form steps. State management is handled using React Hook Form combined with Zod for schema validation. Each page represents a form step with its own validation schema defined in schemas.ts, ensuring data integrity and validation at each step. We utilize a FormContext to share form data across different pages, allowing for seamless navigation and data persistence throughout the form. Components manage their local state when necessary but primarily rely on this central form context and the validation schemas. When adding new questions, it's crucial to adhere to this structure to maintain compatibility and ensure smooth integration with existing components.

Files:

To assist you in generating a new question that fits seamlessly into our existing structure, please refer to the following files:

app/context/schemas.ts
import * as z from "zod";
import * as m from "@/paraglide/messages";
import { ageGroups } from "@/constants/ageGroups";

// Extract age group values for the enum
const ageGroupValues = ageGroups.map((ageGroup) => ageGroup.value) as [
  string,
  ...string[],
];

/**
 * Schema for an individual character.
 */
export const characterSchema = z.object({
  name: z.string().min(2, m.characters_errors_nameRequired()),
  isMainCharacter: z.boolean().default(true),
  ageGroup: z.enum(ageGroupValues).optional(),
  characterType: z.enum(["human", "animal"]).default("animal"),
  animalType: z.string().optional(),
  isAnthropomorphic: z.boolean().optional(),
  description: z.string().optional(),
});

/**
 * Schema for Step 1 of the form.
 */
export const step1Schema = z.object({
  characters: z.array(characterSchema).min(1, m.characters_errors_atLeastOne()),
});

/**
 * Schema for Step 2 of the form.
 */
export const step2Schema = z.object({
  illustrationStyle: z.string().min(1, m.illustration_errors_required()),
});

/**
 * Overall form schema combining step1 and step2 schemas.
 */
export const formSchema = step1Schema.merge(step2Schema);

// Type inferred from the form schema
export type FormValues = z.infer<typeof formSchema>;

app/context/FormContext.tsx
import type React from "react";
import { createContext, useContext, useState } from "react";
import type { FormValues } from "@/app/context/schemas";

type FormContextType = {
	formData: FormValues;
	setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
};

export const FormContext = createContext<FormContextType | null>(null);

interface FormDataProviderProps {
	children: React.ReactNode;
	initialData?: FormValues;
}

export const FormDataProvider: React.FC<FormDataProviderProps> = ({
	children,
	initialData,
}) => {
	const [formData, setFormData] = useState<FormValues>(
		initialData || {
			characters: [
				{
					name: "",
					isMainCharacter: true,
					ageGroup: "",
					characterType: "animal",
					animalType: "",
					isAnthropomorphic: true,
					description: "",
				},
			],
			illustrationStyle: "", // Added default value
		},
	);

	return (
		<FormContext.Provider value={{ formData, setFormData }}>
			{children}
		</FormContext.Provider>
	);
};

export const useFormData = () => {
	const context = useContext(FormContext);
	if (!context) {
		throw new Error("useFormData must be used within a FormDataProvider");
	}
	return context;
};


Example page component: app/book-creation/step-1/page.tsx

Related components in app/book-creation/components/step1-characters/
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
		<div className="space-y-4 p-4 relative max-w-full mr-4 ml-4">
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
			<div className="w-full">
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
						<div className="flex items-center space-x-2 mt-4">
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
		</div>
	);
};

export default CharacterForm;
// app/components/CardWrapper.tsx

import type React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface CardWrapperProps {
	children: React.ReactNode;
	title: React.ReactNode;
	description: string;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
	children,
	title,
	description,
}) => {
	return (
		<Card className="w-full max-w-4xl shadow-lg overflow-hidden">
			<CardHeader className="space-y-4 text-center p-4">
				<CardTitle className="text-2xl font-semibold">{title}</CardTitle>
				<CardDescription className="text-gray-600">
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent className="p-2 overflow-hidden">{children}</CardContent>
		</Card>
	);
};

export default CardWrapper;

this is just at est s