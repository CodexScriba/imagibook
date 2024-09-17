import type React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookCreationForm from "../BookCreationForm";

// Mock the dependencies
jest.mock("react-hook-form", () => ({
	useForm: () => ({
		handleSubmit:
			(cb: (data: Record<string, unknown>) => void) =>
			(e: React.FormEvent<HTMLFormElement>) => {
				e.preventDefault();
				cb({});
			},
		register: jest.fn(),
		formState: { errors: {} },
	}),
}));

jest.mock("@hookform/resolvers/zod", () => ({
	zodResolver: jest.fn(),
}));

jest.mock("@/paraglide/messages", () => ({
	bookCreationTitle: () => "Create Your Book",
	bookCreationDescription: () => "Start your book creation journey",
}));

// Mock the Form component
jest.mock("@/components/ui/form", () => ({
	Form: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock other UI components
jest.mock("@/components/ui/card", () => ({
	Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
	CardHeader: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	CardContent: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	CardTitle: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
	CardDescription: ({ children }: { children: React.ReactNode }) => (
		<div>{children}</div>
	),
}));

jest.mock("@/components/ui/button", () => ({
	Button: ({
		children,
		onClick,
		type = "button",
	}: {
		children: React.ReactNode;
		onClick?: () => void;
		type?: "button" | "submit" | "reset";
	}) => (
		<button onClick={onClick} type={type}>
			{children}
		</button>
	),
}));

// Update the mock path to match your project structure
jest.mock("../CreationModeSelector", () => {
	return function DummyCreationModeSelector({ mode, onModeChange }: any) {
		return (
			<div data-testid="creation-mode-selector">
				<button type="button" onClick={() => onModeChange("magicWand")}>
					Magic Wand
				</button>
				<button type="button" onClick={() => onModeChange("storybookStudio")}>
					Storybook Studio
				</button>
			</div>
		);
	};
});

describe("BookCreationForm", () => {
	it("renders the form with correct title and description", () => {
		render(<BookCreationForm />);

		expect(screen.getByText("Create Your Book")).toBeInTheDocument();
		expect(
			screen.getByText("Start your book creation journey"),
		).toBeInTheDocument();
	});

	it("includes the CreationModeSelector component", () => {
		render(<BookCreationForm />);

		expect(screen.getByTestId("creation-mode-selector")).toBeInTheDocument();
	});

	it("contains a submit button", () => {
		render(<BookCreationForm />);

		expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
	});

	it("calls onSubmit when form is submitted", () => {
		const consoleSpy = jest.spyOn(console, "log").mockImplementation();
		render(<BookCreationForm />);

		fireEvent.click(screen.getByRole("button", { name: "Submit" }));

		expect(consoleSpy).toHaveBeenCalledWith(
			expect.objectContaining({ mode: "magicWand" }),
		);
		consoleSpy.mockRestore();
	});

	it("updates mode when CreationModeSelector changes", () => {
		const consoleSpy = jest.spyOn(console, "log").mockImplementation();
		render(<BookCreationForm />);

		fireEvent.click(screen.getByRole("button", { name: "Storybook Studio" }));
		fireEvent.click(screen.getByRole("button", { name: "Submit" }));

		expect(consoleSpy).toHaveBeenCalledWith(
			expect.objectContaining({ mode: "storybookStudio" }),
		);
		consoleSpy.mockRestore();
	});
});
