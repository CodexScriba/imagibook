// app/book-creation/step-2/__tests__/Step2Page.test.tsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Step2Page from "../page";
import { useRouter } from "next/navigation";
import { FormDataProvider } from "@/app/context/FormContext";
import * as m from "@/paraglide/messages"; // Import the messages

// Mock the Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockBack = jest.fn();

// Mock implementation of useRouter
(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
  back: mockBack,
});

describe("Step2Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component correctly", () => {
    render(
      <FormDataProvider>
        <Step2Page />
      </FormDataProvider>,
    );

    // Use more specific queries to avoid multiple matches
    const heading = screen.getByRole("heading", { name: /select creation mode/i });
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(/select your creation mode/i);
    expect(description).toBeInTheDocument();

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeInTheDocument();

    const previousButton = screen.getByRole("button", { name: /previous/i });
    expect(previousButton).toBeInTheDocument();
  });

  it("calls router.back when Previous button is clicked", () => {
    render(
      <FormDataProvider>
        <Step2Page />
      </FormDataProvider>,
    );

    const previousButton = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(previousButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("submits the form and navigates to the next step on valid submission", async () => {
    render(
      <FormDataProvider>
        <Step2Page />
      </FormDataProvider>,
    );

    // Select one of the actual creation mode options
    const magicWandOption = screen.getByLabelText(/magic wand mode/i);
    fireEvent.click(magicWandOption);

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/book-creation/step-3");
    });
  });

  it("shows validation errors on invalid submission", async () => {
    render(
      <FormDataProvider>
        <Step2Page />
      </FormDataProvider>,
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      // Use the actual error message from the messages module
      const errorMessage = screen.getByText(m.creationMode_errors_required());
      expect(errorMessage).toBeInTheDocument();
    });

    expect(mockPush).not.toHaveBeenCalled();
  });
});
