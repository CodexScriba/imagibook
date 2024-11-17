// app/signup/actions.ts

'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function signup(formData: FormData) {
  const supabase = createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validate input data here if necessary

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    // Handle error (e.g., redirect to an error page or display a message)
    redirect('/error');
    return;
  }

  // Optionally, you can insert additional user data into your database here

  // Redirect the user after successful sign-up
  redirect('/welcome');
}
