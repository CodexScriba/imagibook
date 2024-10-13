// components/Characters.tsx

import type React from "react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import * as m from "@/paraglide/messages";
import CharacterTab from "./CharacterTab";
import CharacterForm from "./CharacterForm";
import type { FormValues } from "@/app/context/schemas";

const Characters: React.FC = () => {
	const { control } = useFormContext<FormValues>();

	const { fields, append, remove } = useFieldArray({
		control,
		name: "characters",
	});

	const [activeTab, setActiveTab] = useState<number>(0);

	const addCharacter = () => {
		append({
			name: "",
			isMainCharacter: fields.length === 0,
			ageGroup: "",
			description: "",
		});
		setActiveTab(fields.length); // Set active tab to the new character
	};

	const handleRemove = (index: number) => {
		if (fields.length > 1) {
			remove(index);
			setActiveTab((prevTab) => (prevTab > 0 ? prevTab - 1 : 0));
		}
	};

	return (
		<div className="space-y-6">
			<CharacterTab
				fields={fields}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				addCharacter={addCharacter}
			/>

			{/* Active Character Form */}
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
	);
};

export default Characters;
