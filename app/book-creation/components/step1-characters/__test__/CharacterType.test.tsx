import type React from "react";
import { render, screen } from "@testing-library/react";
import CharacterType from "../CharacterType";
import { FormProvider, useForm } from "react-hook-form";

// Keep your existing mocks...

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
	const methods = useForm({
		defaultValues: {
			characterType: "animal",
			animalType: "",
			isAnthropomorphic: false,
		},
	});
	return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("CharacterType", () => {
	it("renders the Character Type label", () => {
		render(
			<TestWrapper>
				<CharacterType />
			</TestWrapper>,
		);

		expect(screen.getByText("Character Type")).toBeInTheDocument();
	});

	it("renders the Animal Type label when character type is animal", () => {
		render(
			<TestWrapper>
				<CharacterType />
			</TestWrapper>,
		);

		expect(screen.getByText("Animal Type")).toBeInTheDocument();
	});

	it("renders the Anthropomorphic option for animal characters", () => {
		render(
			<TestWrapper>
				<CharacterType />
			</TestWrapper>,
		);

		expect(screen.getByText("Anthropomorphic")).toBeInTheDocument();
	});
});
