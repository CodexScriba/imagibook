import { render, screen } from "@testing-library/react";
import Step1Page from "../page";

jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: jest.fn(),
		back: jest.fn(),
	}),
}));

jest.mock("@/app/context/FormContext", () => ({
	useFormData: () => ({
		formData: {},
		setFormData: jest.fn(),
	}),
}));

describe("Step1Page", () => {
	it("renders the character input form", () => {
		render(<Step1Page />);
		expect(screen.getByText("Character Creation")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Previous" }),
		).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
	});
});
