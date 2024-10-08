// components/__tests__/IllustrationCarousel.test.tsx

import type React from "react";
import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { IllustrationCarousel } from "../IllustrationCarousel";

// 1. Mock the Carousel and related components to prevent embla-carousel from executing
jest.mock("@/components/ui/carousel", () => ({
	Carousel: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="mocked-carousel">{children}</div>
	),
	CarouselContent: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="mocked-carousel-content">{children}</div>
	),
	CarouselItem: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="mocked-carousel-item">{children}</div>
	),
	CarouselNext: () => <button type="button" data-testid="mocked-carousel-next">Next</button>,
	CarouselPrevious: () => (
		<button type="button" data-testid="mocked-carousel-previous">Previous</button>
	),
}));

// 2. Mock the Card and related components
jest.mock("@/components/ui/card", () => ({
	Card: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="mocked-card">{children}</div>
	),
	CardContent: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="mocked-card-content">{children}</div>
	),
}));

// 3. Mock the Button component
jest.mock("@/components/ui/button", () => ({
	Button: ({
		children,
		onClick,
		variant,
	}: {
		children: React.ReactNode;
		onClick: () => void;
		variant: string;
	}) => (
		<button
			data-testid={`mocked-button-${variant}`}
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	),
}));

// 4. Mock react-hook-form's useFormContext
jest.mock("react-hook-form", () => ({
	...jest.requireActual("react-hook-form"),
	useFormContext: () => ({
		setValue: jest.fn(),
		watch: jest.fn().mockReturnValue(""),
	}),
}));

describe("IllustrationCarousel", () => {
	// Define a simple Wrapper to provide FormContext
	const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
		const methods = useForm({
			defaultValues: {
				illustrationStyle: "",
			},
		});
		return <FormProvider {...methods}>{children}</FormProvider>;
	};

	it("renders without crashing", () => {
		render(
			<Wrapper>
				<IllustrationCarousel />
			</Wrapper>,
		);

		// Check if the mocked carousel is in the document
		expect(screen.getByTestId("mocked-carousel")).toBeInTheDocument();
	});

	it("displays at least one illustration item", () => {
		render(
			<Wrapper>
				<IllustrationCarousel />
			</Wrapper>,
		);

		// Check if at least one carousel item is rendered
		const carouselItems = screen.getAllByTestId("mocked-carousel-item");
		expect(carouselItems.length).toBeGreaterThan(0);
	});
});
