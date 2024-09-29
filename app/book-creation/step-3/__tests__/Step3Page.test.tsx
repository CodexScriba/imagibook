import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Step3Page from "../page";
import { useRouter } from "next/navigation";
import { FormDataProvider } from "@/app/context/FormContext";
import * as m from "@/paraglide/messages";

jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockBack = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
	push: mockPush,
	back: mockBack,
});

describe("Step3Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders the component correctly", () => {
		render(
			<FormDataProvider>
				<Step3Page />
			</FormDataProvider>,
		);

		expect(screen.getByText(m.step3_title())).toBeInTheDocument();
		expect(screen.getByText(m.step3_description())).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: m.buttons_previous() }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: m.buttons_next() }),
		).toBeInTheDocument();
	});

	it("navigates to step-2 when Previous button is clicked", () => {
		render(
			<FormDataProvider>
				<Step3Page />
			</FormDataProvider>,
		);

		const previousButton = screen.getByRole("button", {
			name: m.buttons_previous(),
		});
		fireEvent.click(previousButton);

		expect(mockPush).toHaveBeenCalledTimes(1);
		expect(mockPush).toHaveBeenCalledWith("/book-creation/step-2");
	});

	it("submits the form and navigates to the next step on valid submission", async () => {
		render(
			<FormDataProvider>
				<Step3Page />
			</FormDataProvider>,
		);

		const storyOverviewTextarea = screen.getByRole("textbox");
		fireEvent.change(storyOverviewTextarea, {
			target: { value: "A compelling story overview" },
		});

		const nextButton = screen.getByRole("button", { name: m.buttons_next() });
		fireEvent.click(nextButton);

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith("/book-creation/step-4");
		});
	});

	it("shows validation error when submitting an empty story overview", async () => {
		render(
			<FormDataProvider>
				<Step3Page />
			</FormDataProvider>,
		);

		const nextButton = screen.getByRole("button", { name: m.buttons_next() });
		fireEvent.click(nextButton);

		await waitFor(() => {
			expect(
				screen.getByText(/story overview is required/i),
			).toBeInTheDocument();
		});

		expect(mockPush).not.toHaveBeenCalled();
	});

	it("updates form data when story overview is changed", async () => {
		render(
			<FormDataProvider>
				<Step3Page />
			</FormDataProvider>,
		);

		const storyOverviewTextarea = screen.getByRole("textbox");
		fireEvent.change(storyOverviewTextarea, {
			target: { value: "New story overview" },
		});

		const nextButton = screen.getByRole("button", { name: m.buttons_next() });
		fireEvent.click(nextButton);

		await waitFor(() => {
			expect(mockPush).toHaveBeenCalledWith("/book-creation/step-4");
		});
	});
});
