import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import Characters from "../Characters";
import * as m from "@/paraglide/messages";

// Mock the messages module
jest.mock("@/paraglide/messages", () => ({
  characters_labels_name: () => "Character Name",
  characters_placeholders_name: () => "Enter character name",
  characters_buttons_remove: () => "Remove character",
  characters_labels_isMainCharacter: () => "Main Character",
  characters_labels_description: () => "Description",
  characters_placeholders_description: () => "Describe the character",
  characters_buttons_add: () => "Add Character",
}));

// Mock the AgeGroupSelect component
jest.mock("../AgeGroupSelect", () => ({
  AgeGroupSelect: () => <div data-testid="age-group-select" />,
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      characters: [{ name: "", isMainCharacter: true, ageGroup: "", description: "" }],
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("Characters Component", () => {
  it("renders initial character form", () => {
    render(
      <TestWrapper>
        <Characters />
      </TestWrapper>
    );

    expect(screen.getByLabelText("Character Name")).toBeInTheDocument();
    expect(screen.getByTestId("age-group-select")).toBeInTheDocument();
    expect(screen.getByLabelText("Main Character")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("adds a new character when 'Add Character' button is clicked", () => {
    render(
      <TestWrapper>
        <Characters />
      </TestWrapper>
    );

    const addButton = screen.getByText("Add Character");
    fireEvent.click(addButton);

    const nameInputs = screen.getAllByLabelText("Character Name");
    expect(nameInputs).toHaveLength(2);
  });

  it("removes a character when 'Remove' button is clicked", () => {
    render(
      <TestWrapper>
        <Characters />
      </TestWrapper>
    );

    const addButton = screen.getByText("Add Character");
    fireEvent.click(addButton);

    const removeButtons = screen.getAllByLabelText("Remove character");
    fireEvent.click(removeButtons[1]);

    const nameInputs = screen.getAllByLabelText("Character Name");
    expect(nameInputs).toHaveLength(1);
  });

  it("disables remove button when only one character remains", () => {
    render(
      <TestWrapper>
        <Characters />
      </TestWrapper>
    );

    const removeButton = screen.getByLabelText("Remove character");
    expect(removeButton).toBeDisabled();
  });

  it("sets isMainCharacter to true for the first character", () => {
    render(
      <TestWrapper>
        <Characters />
      </TestWrapper>
    );

    const mainCharacterSwitch = screen.getByLabelText("Main Character");
    expect(mainCharacterSwitch).toBeChecked();
  });
});
