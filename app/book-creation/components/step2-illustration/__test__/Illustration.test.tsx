// Illustration.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides custom matchers like toBeInTheDocument
import { Illustration } from '../Illustration';

// Mock the child components to isolate the test
jest.mock('../IllustrationCarousel', () => ({
  IllustrationCarousel: () => <div data-testid="illustration-carousel">Mocked Carousel</div>,
}));

jest.mock('../IllustrationCharacterType', () => ({
  IllustrationCharacterType: () => <div data-testid="illustration-character-type">Mocked Character Type</div>,
}));

describe('Illustration Component', () => {
  test('renders IllustrationCarousel and IllustrationCharacterType components', () => {
    // Render the Illustration component
    render(<Illustration />);

    // Assert that the mocked IllustrationCarousel is rendered
    const carouselElement = screen.getByTestId('illustration-carousel');
    expect(carouselElement).toBeInTheDocument();
    expect(carouselElement).toHaveTextContent('Mocked Carousel');

    // Assert that the mocked IllustrationCharacterType is rendered
    const characterTypeElement = screen.getByTestId('illustration-character-type');
    expect(characterTypeElement).toBeInTheDocument();
    expect(characterTypeElement).toHaveTextContent('Mocked Character Type');
  });

  test('matches the snapshot', () => {
    // Render the Illustration component
    const { asFragment } = render(<Illustration />);
    
    // Assert that the rendered output matches the snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
