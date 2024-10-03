import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useFormData } from "@/app/context/FormContext";
import Step1Page from "../page";

jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
}));

jest.mock("@/app/context/FormContext", () => ({
	useFormData: jest.fn(),
}));

describe("Step1Page", () => {
	const mockRouter = {
		push: jest.fn(),
		back: jest.fn(),
	};

	const mockSetFormData = jest.fn();

	beforeEach(() => {
		(useRouter as jest.Mock).mockReturnValue(mockRouter);
		(useFormData as jest.Mock).mockReturnValue({
			formData: {},
			setFormData: mockSetFormData,
		});
	});

	it("renders the Step1Page component", () => {
		render(<Step1Page />);
		expect(screen.getByText("Characters")).toBeInTheDocument();
	});

	it("navigates to the next step on form submission", async () => {
		render(<Step1Page />);
		const nextButton = screen.getByText("Next");
		fireEvent.click(nextButton);
		expect(mockRouter.push).toHaveBeenCalledWith("/book-creation/step-2");
	});

	it("navigates back when the Previous button is clicked", () => {
		render(<Step1Page />);
		const previousButton = screen.getByText("Previous");
		fireEvent.click(previousButton);
		expect(mockRouter.back).toHaveBeenCalled();
	});

	it("updates form data on submission", async () => {
		render(<Step1Page />);
		const nextButton = screen.getByText("Next");
		fireEvent.click(nextButton);
		expect(mockSetFormData).toHaveBeenCalled();
	});

	it("displays the correct title and description", () => {
		render(<Step1Page />);
		expect(screen.getByText("Characters")).toBeInTheDocument();
		expect(
			screen.getByText("Enter information about the characters in your story."),
		).toBeInTheDocument();
	});
});
