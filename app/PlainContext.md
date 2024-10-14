Imagibook empowers busy parents to effortlessly create personalized, magical bedtime stories that captivate their child's imagination and strengthen their bond, using cutting-edge AI storytelling tools.

We’re going to be working on the webform the parents filled to get the AI to write them a personalized tale.

There are going to be around 18 steps, we’re just getting started.

**Template for Explaining Code in Your Project**

### 1. Overview of How the Code Works

The form in this project uses the **React Context API** and **react-hook-form** to handle form state, share data between components, and provide a smooth user experience for a multi-step web form. The form follows a structured approach with two distinct levels:

- **Page Level**: Each step in the form is represented as a separate page component (e.g., `Step1Page`). The page-level components use **react-hook-form** to manage form data specific to that step and handle submission and navigation logic.
- **Component Level**: Components like **Characters** handle specific parts of the form, such as dynamically managing a list of characters. These components use **react-hook-form** hooks like `useFieldArray` to manage nested or repeating fields, ensuring the form remains interactive and modular.

The form also uses a **CardWrapper** component to provide a consistent UI for each step. This component wraps the form content in a card layout, displaying titles and descriptions to guide the user through the form steps.

- **React Context (`FormContext`)** is used to provide and manage the form data across multiple steps without drilling props, ensuring a consistent state throughout the form.
- **react-hook-form** manages individual form states, validation, and submission. Validation is performed with **Zod schemas**, which defines and enforces the structure of the form data.
- Components like **Characters** make use of `useFieldArray` from `react-hook-form` to manage repeating fields, allowing users to dynamically add or remove items from the form.

This structure helps in building a form that is modular, maintainable, and scalable, where each step can easily be managed and modified.

### 2. Snippet of the Schema (`schemas.ts`)

Here's a snippet showing the character and step schema validation using **Zod**. The `characterSchema` is used to define the fields required for each character, and `step1Schema` wraps that for the first step:

- The `characterSchema` defines the structure of each character, requiring a `name` with a minimum length, a `boolean` to mark the main character, an optional `ageGroup`, and an optional `description`.
- The `step1Schema` validates the `characters` array, ensuring there is at least one character in the list.

### 3. Snippet of the Form Context (`FormContext.tsx`)

The **FormContext** is defined using `React.createContext` and provides `formData` and `setFormData` to manage and update the form’s data globally across all steps of the form:

- `FormContext` provides a global state for the form.
- `FormDataProvider` wraps the parts of the app needing access to the form data, and `useFormData` is a custom hook for easily accessing this context.
- The form data can be updated by using the `setFormData` function provided by `useState`.
