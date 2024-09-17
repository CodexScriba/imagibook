import { render, fireEvent, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CreationModeSelector from "@/app/book-creation/components/CreationModeSelector";

jest.mock("@/paraglide/messages", () => ({
	creationMode_legend: () => "Creation Mode",
	creationMode_magicWand_title: () => "Magic Wand",
	creationMode_magicWand_description: () => "Create with AI assistance",
	creationMode_storybookStudio_title: () => "Storybook Studio",
	creationMode_storybookStudio_description: () => "Create manually",
}));

const schema = z.object({
	mode: z.string(),
});

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const methods = useForm({
		defaultValues: {
			mode: "",
		},
		resolver: zodResolver(schema),
	});

	return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("CreationModeSelector", () => {
	it("renders the component with correct legend", () => {
		render(<CreationModeSelector />, { wrapper: Wrapper });
		expect(screen.getByText("Creation Mode")).toBeInTheDocument();
	});

	it("displays both creation mode options", () => {
		render(<CreationModeSelector />, { wrapper: Wrapper });
		expect(screen.getByText("Magic Wand")).toBeInTheDocument();
		expect(screen.getByText("Storybook Studio")).toBeInTheDocument();
	});

	it("allows selecting a creation mode", () => {
		render(<CreationModeSelector />, { wrapper: Wrapper });
		const magicWandOption = screen.getByRole("radio", { name: "Magic Wand" });
		fireEvent.click(magicWandOption);
		expect(magicWandOption).toBeChecked();
	});

	it("highlights the selected mode", () => {
		render(<CreationModeSelector />, { wrapper: Wrapper });
		const magicWandCard = screen.getByTestId("magicWand-card");
		const storybookStudioCard = screen.getByTestId("storybookStudio-card");

		const magicWandRadio = screen.getByRole("radio", { name: "Magic Wand" });
		const storybookStudioRadio = screen.getByRole("radio", {
			name: "Storybook Studio",
		});

		fireEvent.click(magicWandRadio);
		expect(magicWandCard).toHaveClass("border-primary");
		expect(storybookStudioCard).not.toHaveClass("border-primary");

		fireEvent.click(storybookStudioRadio);
		expect(storybookStudioCard).toHaveClass("border-primary");
		expect(magicWandCard).not.toHaveClass("border-primary");
	});

	it("displays correct descriptions for each mode", () => {
		render(<CreationModeSelector />, { wrapper: Wrapper });
		expect(screen.getByText("Create with AI assistance")).toBeInTheDocument();
		expect(screen.getByText("Create manually")).toBeInTheDocument();
	});
});
