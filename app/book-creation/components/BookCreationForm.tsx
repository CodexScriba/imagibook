"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as m from "@/paraglide/messages";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
	// Define your form schema here
});

type FormValues = z.infer<typeof formSchema>;

const BookCreationForm: React.FC = () => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			// Set your default values here
		},
	});

	const onSubmit = (data: FormValues) => {
		console.log(data);
		// Handle form submission
	};

	return (
		<div className="mt-10 w-full flex items-center justify-center">
			<div className="w-full max-w-2xl">
				<Card>
					<CardHeader className="text-center">
						<CardTitle>{m.bookCreationTitle()}</CardTitle>
						<CardDescription>{m.bookCreationDescription()}</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								{/* Add your form fields here */}
								<div className="flex justify-center">
									<Button type="submit">Submit</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default BookCreationForm;
