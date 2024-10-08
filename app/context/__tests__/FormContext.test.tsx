import type React from "react";
import { render, act } from "@testing-library/react";
import { FormDataProvider, useFormData } from "../FormContext";

describe("FormContext", () => {
	it("provides default form data", () => {
		let formData: {
			characters: Array<{
				name: string;
				isMainCharacter: boolean;
				ageGroup: string;
				description: string;
			}>;
			illustrationStyle: string;
			characterType: string;
			animalType: string;
			isAnthropomorphic: boolean;
		};

		const TestComponent = () => {
			const { formData: data } = useFormData();
			formData = data;
			return null;
		};

		render(
			<FormDataProvider>
				<TestComponent />
			</FormDataProvider>,
		);

		expect(formData).toEqual({
			characters: [
				{
					name: "",
					isMainCharacter: true,
					ageGroup: "",
					description: "",
				},
			],
			illustrationStyle: "",
			characterType: "human",
			animalType: "",
			isAnthropomorphic: false,
		});
	});

	it("updates form data", () => {
		let formData: {
			characters: Array<{
				name: string;
				isMainCharacter: boolean;
				ageGroup: string;
				description: string;
			}>;
			illustrationStyle: string;
			characterType: string;
			animalType: string;
			isAnthropomorphic: boolean;
		};
		let setFormData: React.Dispatch<React.SetStateAction<typeof formData>>;

		const TestComponent = () => {
			const context = useFormData();
			formData = context.formData;
			setFormData = context.setFormData;
			return null;
		};

		render(
			<FormDataProvider>
				<TestComponent />
			</FormDataProvider>,
		);

		act(() => {
			setFormData((prevData) => ({
				...prevData,
				illustrationStyle: "cartoon",
			}));
		});

		expect(formData.illustrationStyle).toBe("cartoon");
	});
});
