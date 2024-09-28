// app/book-creation/step-1/__tests__/Step1Page.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Step1Page from "../page";
import { useRouter } from "next/navigation";
import { FormDataProvider } from "@/app/context/FormContext";

jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockBack = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
	push: mockPush,
	back: mockBack,
});

describe("Step1Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the component correctly", () => {
		render(
			<FormDataProvider>
				<Step1Page />
			</FormDataProvider>,
		);

		expect(screen.getByText(/characters/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /previous/i }),
		).toBeInTheDocument();
	});

	it("calls router.back when Previous button is clicked", () => {
		render(
			<FormDataProvider>
				<Step1Page />
			</FormDataProvider>,
		);

		const previousButton = screen.getByRole("button", { name: /previous/i });
		fireEvent.click(previousButton);

		expect(mockBack).toHaveBeenCalledTimes(1);
	});

	it("submits the form and navigates to the next step on valid submission", async () => {
		render(
			<FormDataProvider>
				<Step1Page />
			</FormDataProvider>,
		);

		// Assuming that Characters component has an input with label 'Character Name'
		const characterNameInput = screen.getByLabelText(/character name/i);
		fireEvent.change(characterNameInput, { target: { value: "John Doe" } });

		const nextButton = screen.getByRole("button", { name: /next/i });
		fireEvent.click(nextButton);

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith("/book-creation/step-2");
		});
	});

	it("shows validation errors on invalid submission", async () => {
		render(
			<FormDataProvider>
				<Step1Page />
			</FormDataProvider>,
		);

		const nextButton = screen.getByRole("button", { name: /next/i });
		fireEvent.click(nextButton);

		await waitFor(() => {
			expect(
				screen.getByText(
					/Name is required and must contain at least two letters/i,
				),
			).toBeInTheDocument();
		});

		expect(mockPush).not.toHaveBeenCalled();
	});
});
