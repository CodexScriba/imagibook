// components/__tests__/CharacterTab.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacterTab from '../CharacterTab';
import { useForm, FormProvider, FieldArrayWithId } from 'react-hook-form';

// Mock the dependencies
jest.mock('@/paraglide/messages', () => ({
  characters_buttons_add: () => 'Add Character',
}));

// Mock lucide-react icons to prevent rendering actual SVGs
jest.mock('lucide-react', () => ({
  Plus: () => <svg data-testid="plus-icon" />,
  ChevronLeft: () => <svg data-testid="chevron-left-icon" />,
  ChevronRight: () => <svg data-testid="chevron-right-icon" />,
}));

// Mock the Button component to simplify rendering
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

// Define a wrapper to provide the necessary context
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      characters: [{ name: 'Character 1' }, { name: 'Character 2' }],
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('CharacterTab Component', () => {
  const mockSetActiveTab = jest.fn();
  const mockAddCharacter = jest.fn();

  const defaultProps = {
    fields: [
      { id: '1', name: 'Character 1' },
      { id: '2', name: 'Character 2' },
    ],
    activeTab: 0,
    setActiveTab: mockSetActiveTab,
    addCharacter: mockAddCharacter,
  };

  test('it renders without crashing', () => {
    render(
      <Wrapper>
        <CharacterTab
          fields={[
            { id: '1', name: 'Character 1', isMainCharacter: false, characterType: 'human' },
            { id: '2', name: 'Character 2', isMainCharacter: false, characterType: 'human' },
          ] as FieldArrayWithId<{ characters: { name: string; isMainCharacter: boolean; characterType: "human" | "animal"; ageGroup?: string; animalType?: string; isAnthropomorphic?: boolean; description?: string; }[]; illustrationStyle: string; }, "characters">[]}
          activeTab={0}
          setActiveTab={mockSetActiveTab}
          addCharacter={mockAddCharacter}
        />
      </Wrapper>
    );

    // Check if the Add Character button is in the document
    const addButton = screen.getByText('Add Character');
    expect(addButton).toBeInTheDocument();
  });
  test('it displays all character labels', () => {
    render(
      <Wrapper>
        <CharacterTab
          fields={[
            { id: '1', name: 'Character 1', isMainCharacter: false, characterType: 'human' },
            { id: '2', name: 'Character 2', isMainCharacter: false, characterType: 'human' },
          ]}
          activeTab={defaultProps.activeTab}
          setActiveTab={defaultProps.setActiveTab}
          addCharacter={defaultProps.addCharacter}
        />
      </Wrapper>
    );

    // Check if each character button is rendered
    expect(screen.getByText('Character 1')).toBeInTheDocument();
    expect(screen.getByText('Character 2')).toBeInTheDocument();
  });
});
