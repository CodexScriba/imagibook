import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Step1Page from '../page';
import { FormDataProvider } from '@/app/context/FormContext';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/context/FormContext', () => ({
  FormDataProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useFormData: () => ({
    formData: {},
    setFormData: jest.fn(),
  }),
}));

describe('Step1Page', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('renders the Step1Page component', () => {
    render(
      <FormDataProvider>
        <Step1Page />
      </FormDataProvider>
    );

    expect(screen.getByText('Character Creation')).toBeInTheDocument();
    expect(screen.getByText('Add Character')).toBeInTheDocument();
  });

  it('navigates to the previous page when back button is clicked', () => {
    render(
      <FormDataProvider>
        <Step1Page />
      </FormDataProvider>
    );

    const backButton = screen.getByText('Previous');
    fireEvent.click(backButton);

    expect(mockPush).toHaveBeenCalledWith('/book-creation');
  });

  it('submits the form and navigates to the next step', async () => {
    render(
      <FormDataProvider>
        <Step1Page />
      </FormDataProvider>
    );

    const nextButton = screen.getByText('Next');
    
    await act(async () => {
      fireEvent.click(nextButton);
    });

    expect(mockPush).toHaveBeenCalledWith('/book-creation');
  });
});