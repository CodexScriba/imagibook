// components/StoryOverview.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import StoryOverview from './StoryOverview';
import * as m from '@/paraglide/messages';

jest.mock('@/paraglide/messages', () => ({
  storyOverview_label: jest.fn(() => 'Story Overview'),
  storyOverview_description: jest.fn(
    () => 'Please provide a brief overview of your story.'
  ),
  storyOverview_example: jest.fn(() => 'Once upon a time...'),
  storyOverview_errors_minLength: jest.fn(
    () => 'The story overview is too short.'
  ),
}));

describe('StoryOverview Component', () => {
  const renderComponent = (methods: UseFormReturn<any>) => {
    return render(
      <FormProvider {...methods}>
        <StoryOverview />
      </FormProvider>
    );
  };

  test('renders the component correctly', () => {
    const methods = useForm({
      defaultValues: {
        storyOverview: '',
      },
    });

    renderComponent(methods);

    // Check that the label is rendered
    expect(screen.getByText('Story Overview')).toBeInTheDocument();

    // Check that the description is rendered
    expect(
      screen.getByText('Please provide a brief overview of your story.')
    ).toBeInTheDocument();

    // Check that the textarea is rendered with the correct placeholder
    const textarea = screen.getByPlaceholderText('Once upon a time...');
    expect(textarea).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    const methods = useForm({
      defaultValues: {
        storyOverview: '',
      },
    });

    // Set an error
    methods.setError('storyOverview', {
      type: 'minLength',
      message: 'The story overview is too short.',
    });

    renderComponent(methods);

    // Check that the error message is displayed
    expect(
      screen.getByText('The story overview is too short.')
    ).toBeInTheDocument();
  });
});
