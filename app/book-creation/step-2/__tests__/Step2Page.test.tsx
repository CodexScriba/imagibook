// app/book-creation/step-2/__tests__/Step2Page.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Step2Page from "../page";
import { useRouter } from "next/navigation";
import { useFormData } from "@/app/context/FormContext";

// Mock the useRouter hook from Next.js
jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
}));

// Mock the useFormData hook from your FormContext
jest.mock("@/app/context/FormContext", () => ({
	useFormData: jest.fn(),
}));

// Mock the Illustration component
jest.mock(
	"@/app/book-creation/components/step2-illustration/Illustration",
	() => ({
		Illustration: () => (
			<div data-testid="illustration">Mocked Illustration</div>
		),
	}),
);

describe("Step2Page", () => {
	it("renders without crashing and displays navigation buttons", () => {
		// Mock implementation of useRouter
		const push = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({ push });

		// Mock implementation of useFormData
		const formData = {
			illustrationStyle: "",
			characterType: "human",
			animalType: "",
			isAnthropomorphic: false,
		};
		const setFormData = jest.fn();
		(useFormData as jest.Mock).mockReturnValue({ formData, setFormData });

		render(<Step2Page />);

		// Assert that the Next and Previous buttons are in the document
		expect(screen.getByRole("button", { name: /Next/i })).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Previous/i }),
		).toBeInTheDocument();
	});
});
