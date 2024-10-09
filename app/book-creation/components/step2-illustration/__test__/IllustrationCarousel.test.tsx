// app/book-creation/components/step2-illustration/__test__/IllustrationCarousel.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import { IllustrationCarousel } from "../IllustrationCarousel";
import { useForm, FormProvider } from "react-hook-form";

// 1. Mock the Carousel components to avoid dependency on 'embla-carousel-react'
jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
  CarouselNext: () => <button data-testid="carousel-next">Next</button>,
  CarouselPrevious: () => <button data-testid="carousel-prev">Previous</button>,
}));

// 2. Mock the illustrationData to provide predictable data
jest.mock("@/constants/IllustrationData", () => ({
  illustrationData: [
    {
      value: "style1",
      title: "Style 1",
      description: "Description for Style 1",
      image: "/path/to/image1.jpg",
    },
    {
      value: "style2",
      title: "Style 2",
      description: "Description for Style 2",
      image: "/path/to/image2.jpg",
    },
  ],
}));

describe("IllustrationCarousel", () => {
  test("renders without crashing and displays carousel items", () => {
    // 3. Initialize react-hook-form and wrap the component with FormProvider
    const Wrapper = () => {
      const methods = useForm();
      return (
        <FormProvider {...methods}>
          <IllustrationCarousel />
        </FormProvider>
      );
    };

    // 4. Render the component
    render(<Wrapper />);

    // 5. Assertions to verify elements are rendered

    // Check that the Carousel container is rendered
    expect(screen.getByTestId("carousel")).toBeInTheDocument();

    // Check that the CarouselContent is rendered
    expect(screen.getByTestId("carousel-content")).toBeInTheDocument();

    // Check that two CarouselItems are rendered (as per mocked data)
    const carouselItems = screen.getAllByTestId("carousel-item");
    expect(carouselItems).toHaveLength(2);

    // Check for specific text content from the mocked illustrationData
    expect(screen.getByText("Style 1")).toBeInTheDocument();
    expect(screen.getByText("Style 2")).toBeInTheDocument();
    expect(screen.getByText("Description for Style 1")).toBeInTheDocument();
    expect(screen.getByText("Description for Style 2")).toBeInTheDocument();

    // Check that navigation buttons are rendered
    expect(screen.getByTestId("carousel-next")).toBeInTheDocument();
    expect(screen.getByTestId("carousel-prev")).toBeInTheDocument();
  });
});
