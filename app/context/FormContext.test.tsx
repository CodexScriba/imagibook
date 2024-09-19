import React from "react";
import { render, act, renderHook } from "@testing-library/react";
import * as zod from "zod";
import * as reactHookForm from "react-hook-form";
import * as zodResolver from "@hookform/resolvers/zod";

// Mock the modules
jest.mock("zod", () => ({
	object: jest.fn().mockReturnValue({
		merge: jest.fn().mockReturnThis(),
	}),
	string: jest.fn().mockReturnValue({
		min: jest.fn().mockReturnThis(),
		optional: jest.fn().mockReturnThis(),
	}),
	array: jest.fn().mockReturnValue({
		min: jest.fn().mockReturnThis(),
	}),
	enum: jest.fn().mockReturnThis(),
}));
jest.mock("react-hook-form");
jest.mock("@hookform/resolvers/zod");

// Import the component after mocking dependencies
const { FormDataProvider, useFormDataContext } =
	jest.requireActual("./FormContext");

describe("FormDataProvider", () => {
	beforeEach(() => {
		// Set up mock for useForm
		(reactHookForm.useForm as jest.Mock).mockReturnValue({
			reset: jest.fn(),
		});

		// Set up mock for zodResolver
		(zodResolver.zodResolver as jest.Mock).mockReturnValue(jest.fn());
	});

	// Test if the provider renders without crashing
	it("renders without crashing", () => {
		render(
			<FormDataProvider>
				<div>Test</div>
			</FormDataProvider>,
		);
	});

	// Test if the context is properly provided
	it("provides form context", () => {
		const TestComponent = () => {
			const context = useFormDataContext();
			return <div>{context ? "Context provided" : "No context"}</div>;
		};

		const { getByText } = render(
			<FormDataProvider>
				<TestComponent />
			</FormDataProvider>,
		);

		expect(getByText("Context provided")).toBeTruthy();
	});

	// Test if the resetFormData function works
	it("resets form data when called", () => {
		const { result } = renderHook(() => useFormDataContext(), {
			wrapper: FormDataProvider,
		});

		act(() => {
			result.current.resetFormData();
		});

		expect(result.current.formMethods.reset).toHaveBeenCalled();
	});

	// Test if the context throws an error when used outside provider
	it("throws error when used outside provider", () => {
		const TestComponent = () => {
			useFormDataContext();
			return null;
		};

		expect(() => render(<TestComponent />)).toThrow(
			"useFormDataContext must be used within a FormDataProvider",
		);
	});

	// Test if the form methods are properly provided
	it("provides form methods", () => {
		const { result } = renderHook(() => useFormDataContext(), {
			wrapper: FormDataProvider,
		});

		expect(result.current.formMethods).toBeDefined();
		expect(typeof result.current.formMethods.reset).toBe("function");
	});

	// Type safety test (this will cause a TypeScript error if types are incorrect)
	it("ensures type safety", () => {
		const { result } = renderHook(() => useFormDataContext(), {
			wrapper: FormDataProvider,
		});

		result.current.formMethods.nonExistentMethod();

		result.current.resetFormData.nonExistentProperty;
	});
});
