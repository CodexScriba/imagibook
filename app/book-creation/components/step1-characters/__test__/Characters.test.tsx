// app/book-creation/components/step1-characters/__tests__/Characters.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import Characters from '../Characters';
import { useForm, FormProvider } from 'react-hook-form';
import type { FormValues } from '@/app/context/schemas';

// Mock the dependencies
jest.mock('@/paraglide/messages', () => ({
  characters_buttons_add: () => 'Add Character',
}));

// Mock the CharacterTab component
jest.mock('../CharacterTab', () => ({
  __esModule: true,
  default: ({ addCharacter }: { addCharacter: () => void }) => (
    <div>
      <button onClick={addCharacter}>Add Character</button>
      <div data-testid="character-tab">Character Tab</div>
    </div>
  ),
}));

// Mock the CharacterForm component
jest.mock('../CharacterForm', () => ({
  __esModule: true,
  default: ({ index }: { index: number }) => <div data-testid={`character-form-${index}`}>Character Form {index}</div>,
}));

// Mock react-hook-form's useFieldArray
jest.mock('react-hook-form', () => {
  const original = jest.requireActual('react-hook-form');
  return {
    ...original,
    useFieldArray: jest.fn().mockReturnValue({
      fields: [
        { id: '1', name: 'Character 1' },
        { id: '2', name: 'Character 2' },
      ],
      append: jest.fn(),
      remove: jest.fn(),
    }),
  };
});

// Define a wrapper to provide the necessary context
const Wrapper: React.FC<{ children: React.ReactNode; defaultValues?: Partial<FormValues> }> = ({ children, defaultValues }) => {
  const methods = useForm<FormValues>({
    defaultValues: defaultValues || {
      characters: [
        { name: 'Character 1' },
        { name: 'Character 2' },
      ],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('Characters Component', () => {
  test('it renders without crashing', () => {
    render(
      <Wrapper>
        <Characters />
      </Wrapper>
    );

    // Check if the CharacterTab is rendered
    expect(screen.getByTestId('character-tab')).toBeInTheDocument();

    // Check if the Add Character button is rendered
    expect(screen.getByText('Add Character')).toBeInTheDocument();
  });

  test('it displays all character labels', () => {
    render(
      <Wrapper>
        <Characters />
      </Wrapper>
    );

    // Check if each character form is rendered for the active tab (default activeTab is 0)
    expect(screen.getByTestId('character-form-0')).toBeInTheDocument();
    // Ensure that forms for other characters are not rendered
    expect(screen.queryByTestId('character-form-1')).not.toBeInTheDocument();
  });
});
