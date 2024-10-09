// components/IllustrationCharacterType.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IllustrationCharacterType } from './IllustrationCharacterType';
import { useForm, FormProvider } from 'react-hook-form';

// Mock the animalSuggestions constant
jest.mock('@/constants/IllustrationData', () => ({
  animalSuggestions: ['bear', 'monkey', 'frog', 'rabbit'],
}));

// Create a wrapper component to provide react-hook-form context
const Wrapper: React.FC = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      characterType: 'human',
      animalType: '',
      isAnthropomorphic: false,
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('IllustrationCharacterType Component', () => {
  test('renders Character Type select', () => {
    render(
      <Wrapper>
        <IllustrationCharacterType />
      </Wrapper>
    );

    // Check for the Character Type label
    expect(screen.getByLabelText(/Character Type/i)).toBeInTheDocument();

    // Check for Select options
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByText('Animal')).toBeInTheDocument();
  });

  test('renders Animal Type input and Anthropomorphic switch when Animal is selected', () => {
    render(
      <Wrapper>
        <IllustrationCharacterType />
      </Wrapper>
    );

    // Select the "Animal" option
    fireEvent.click(screen.getByText('Select character type'));
    fireEvent.click(screen.getByText('Animal'));

    // Check for Animal Type input
    expect(screen.getByLabelText(/Animal Type/i)).toBeInTheDocument();

    // Check for Anthropomorphic switch
    expect(screen.getByLabelText(/Anthropomorphic/i)).toBeInTheDocument();
  });

  test('does not render Animal Type input and Anthropomorphic switch when Human is selected', () => {
    render(
      <Wrapper>
        <IllustrationCharacterType />
      </Wrapper>
    );

    // Ensure default selection is "Human"
    expect(screen.queryByLabelText(/Animal Type/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Anthropomorphic/i)).not.toBeInTheDocument();
  });
});
