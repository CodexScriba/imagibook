// components/AgeGroupSelect.tsx

import type React from "react";
import { type Control, Controller } from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ageGroups } from "@/constants/ageGroups";
import * as m from "@/paraglide/messages";
import type { FormValues } from "@/app/context/schemas";

interface AgeGroupSelectProps {
	control: Control<FormValues>;
	index: number;
}
export const AgeGroupSelect: React.FC<AgeGroupSelectProps> = ({
	control,
	index,
}) => (
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
						<SelectValue placeholder={m.characters_placeholders_ageGroup()} />
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
);
