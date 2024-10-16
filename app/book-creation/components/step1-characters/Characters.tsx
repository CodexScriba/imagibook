// app/book-creation/components/step1-characters/Characters.tsx

import type React from "react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import * as m from "@/paraglide/messages";
import CharacterTab from "./CharacterTab";
import CharacterForm from "./CharacterForm";
import type { FormValues } from "@/app/context/schemas";

const Characters: React.FC = () => {
	const { control, trigger } = useFormContext<FormValues>();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "characters",
	});

	const [activeTab, setActiveTab] = useState<number>(0);

	/**
	 * Adds a new character to the form.
	 * Validates the current character's name before adding a new one.
	 */
	const addCharacter = async () => {
		const isValid = await trigger(`characters.${activeTab}.name`);
		if (!isValid) {
			return;
		}
		append({
			name: "",
			isMainCharacter: fields.length === 0,
			ageGroup: "",
			characterType: "animal",
			animalType: "",
			isAnthropomorphic: false,
			description: "",
		});
		setActiveTab(fields.length);
	};

	/**
	 * Removes a character at the specified index.
	 * Adjusts the active tab accordingly.
	 */
	const handleRemove = (index: number) => {
		if (fields.length > 1) {
			remove(index);
			setActiveTab((prevTab) => (prevTab > 0 ? prevTab - 1 : 0));
		}
	};

	return (
		<div className="w-full space-y-4 overflow-hidden">
			{/* Character Tabs */}
			<CharacterTab
				fields={fields}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				addCharacter={addCharacter}
			/>

			{/* Active Character Form */}
			<div className="w-full overflow-x-auto">
				{fields.map((field, index) =>
					index === activeTab ? (
						<CharacterForm
							key={field.id}
							index={index}
							handleRemove={handleRemove}
							totalFields={fields.length}
						/>
					) : null,
				)}
			</div>
		</div>
	);
};

export default Characters;
