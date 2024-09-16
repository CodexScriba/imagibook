import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Characters, { charactersSchema } from '../Characters';

// Mock the UI components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock('@/components/ui/input', () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
}));

jest.mock('lucide-react', () => ({
  Plus: () => <span>Plus</span>,
  Minus: () => <span>Minus</span>,
}));

const CharactersWrapper: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      characters: [{ name: '', description: '' }],
    },
    resolver: zodResolver(charactersSchema),
  });

  return (
    <FormProvider {...methods}>
      <Characters />
    </FormProvider>
  );
};

describe('Characters Component', () => {
  it('renders without crashing', () => {
    render(<CharactersWrapper />);
    expect(screen.getByText(/Please provide a name/)).toBeInTheDocument();
  });

  it('allows adding a new character', () => {
    render(<CharactersWrapper />);
    const addButton = screen.getByText('Plus');
    fireEvent.click(addButton);
    expect(screen.getAllByPlaceholderText('Noah')).toHaveLength(2);
  });

  it('allows removing a character when there is more than one', () => {
    render(<CharactersWrapper />);
    const addButton = screen.getByText('Plus');
    fireEvent.click(addButton);
    const removeButtons = screen.getAllByText('Minus');
    expect(removeButtons).toHaveLength(2);
    fireEvent.click(removeButtons[0]);
    expect(screen.getAllByPlaceholderText('Noah')).toHaveLength(1);
  });

  it('displays error message for empty name', async () => {
    render(<CharactersWrapper />);
    const nameInput = screen.getByPlaceholderText('Noah');
    fireEvent.blur(nameInput);
    const errorMessage = await screen.findByText('Name is required');
    expect(errorMessage).toBeInTheDocument();
  });

  it('allows entering a description', () => {
    render(<CharactersWrapper />);
    const descriptionInput = screen.getByPlaceholderText(/3-year-old blonde/);
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
    expect(descriptionInput).toHaveValue('Test description');
  });
});