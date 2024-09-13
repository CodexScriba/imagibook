'use client'
import type React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as m from "@/paraglide/messages";
import CreationModeSelector from './CreationModeSelector';

// Form schema
const formSchema = z.object({
  storyTitle: z.string().min(1, { message: "Story title is required" }),
  mainCharacter: z.string().min(1, { message: "Main character name is required" }),
  creationMode: z.enum(['magicWand', 'storybookStudio']),
});

type FormData = z.infer<typeof formSchema>;

const BookCreationForm: React.FC = () => {
  const [creationMode, setCreationMode] = useState<'magicWand' | 'storybookStudio'>('magicWand');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storyTitle: "",
      mainCharacter: "",
      creationMode: 'magicWand',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className="font-bold justify-center items-center text-center">{m.bookCreationTitle()}</CardTitle>
        <CardDescription className='text-center'>{m.bookCreationDescription()}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CreationModeSelector 
              mode={creationMode} 
              onModeChange={(mode) => {
                setCreationMode(mode);
                form.setValue('creationMode', mode);
              }} 
            />
            <Button type="submit">{m.createStoryButton()}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookCreationForm;