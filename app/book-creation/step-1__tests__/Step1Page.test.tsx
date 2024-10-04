// __tests__/Step1Page.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Step1Page from "@/app/book-creation/step-1/page";
import { useFormData } from "@/app/context/FormContext";
import * as m from "@/paraglide/messages";

// Mock the Next.js useRouter hook
jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: jest.fn(),
		back: jest.fn(),
	}),
}));

// Mock the useFormData hook from FormContext
jest.mock("@/app/context/FormContext", () => ({
	useFormData: jest.fn(),
}));

describe("Step1Page Component", () => {
	beforeEach(() => {
		// Provide default mock implementation for useFormData
		(useFormData as jest.Mock).mockReturnValue({
			formData: {},
			setFormData: jest.fn(),
		});
	});

	it("renders without crashing", () => {
		render(<Step1Page />);
		// If render completes without throwing, the test passes
	});

	it("renders with the correct title", () => {
		render(<Step1Page />);
		const titleElement = screen.getByText(m.characters_legend());
		expect(titleElement).toBeInTheDocument();
	});
});
