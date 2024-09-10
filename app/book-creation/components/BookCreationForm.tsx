import type React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as m from "@/paraglide/messages";

const BookCreationForm: React.FC = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto mt-10">
      <CardHeader>
        <CardTitle className=" font-bold justify-center items-center text-center ">{m.bookCreationTitle()}</CardTitle>
        <CardDescription className='text-center'>{m.bookCreationDescription()}</CardDescription>
      </CardHeader>
      <CardContent>
        
      </CardContent>
    </Card>
  );
};

export default BookCreationForm;