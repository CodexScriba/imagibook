// components/__test__/AgeGroupSelect.test.tsx

import type React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AgeGroupSelect } from "../AgeGroupSelect";
import { useForm, FormProvider } from "react-hook-form";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers

describe("AgeGroupSelect Component", () => {
	// Wrapper component to provide form context
	const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
		const methods = useForm({
			defaultValues: {
				characters: [
					{
						ageGroup: "",
					},
				],
			},
		});

		return <FormProvider {...methods}>{children}</FormProvider>;
	};
	test("renders the select trigger button", () => {
		const methods = useForm({
			defaultValues: {
				characters: [
					{
						name: "",
						isMainCharacter: false,
						ageGroup: "",
						description: "",
					},
				],
			},
		});

		render(
			<Wrapper>
				{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
<AgeGroupSelect control={methods.control as any} index={0} />
			</Wrapper>
		);

		// Check that the select trigger button is rendered
		const selectButton = screen.getByRole("button");
		expect(selectButton).toBeInTheDocument();
	});

	test("opens the dropdown when the select trigger is clicked", () => {
		const methods = useForm({
			defaultValues: {
				characters: [
					{
						name: "",
						isMainCharacter: false,
						ageGroup: "",
						description: "",
					},
				],
			},
		});

		render(
			<Wrapper>
				<AgeGroupSelect control={methods.control} index={0} />
			</Wrapper>
		);

		const selectButton = screen.getByRole("button");
		fireEvent.click(selectButton);

		// Check that the dropdown options are now visible
		const dropdown = screen.getByRole("listbox");
		expect(dropdown).toBeInTheDocument();
	});

	test("contains multiple selectable options", () => {
		const methods = useForm({
			defaultValues: {
				characters: [
					{
						name: "",
						isMainCharacter: false,
						ageGroup: "",
						description: "",
					},
				],
			},
		});

		render(
			<FormProvider {...methods}>
				<AgeGroupSelect control={methods.control as Control<{ characters: { name: string; isMainCharacter: boolean; ageGroup?: string; description?: string; }[]; }>} index={0} />
			</FormProvider>
		);

		const selectButton = screen.getByRole("button");
		fireEvent.click(selectButton);

		// Retrieve all option elements
		const options = screen.getAllByRole("option");
		expect(options.length).toBeGreaterThan(1); // Ensure there are multiple options
	});	test("allows selecting an option and updates the form state", () => {
		// Define a TestComponent to access form state after selection
		const TestComponent = () => {
			const methods = useForm({
				defaultValues: {
					characters: [
						{
							ageGroup: "",
						},
					],
				},
			});

			return (
				<FormProvider {...methods}>
					<AgeGroupSelect control={methods.control} index={0} />
					{/* Hidden element to display form state for assertion */}
					<div data-testid="form-state">
						{JSON.stringify(methods.getValues())}
					</div>
				</FormProvider>
			);
		};

		render(<TestComponent />);

		const selectButton = screen.getByRole("button");
		fireEvent.click(selectButton);

		// Select the first non-placeholder option
		const options = screen.getAllByRole("option");
		const selectableOption = options.find(
			(option) => option.textContent && option.textContent.trim() !== "",
		);
		expect(selectableOption).toBeDefined();

		if (selectableOption) {
			fireEvent.click(selectableOption);
		}

		// Verify that the selected value is reflected in the form state
		const formState = screen.getByTestId("form-state");
		expect(formState).toHaveTextContent(selectableOption?.textContent || "");
	});
});
