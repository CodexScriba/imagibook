import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
	title?: string;
	description?: string;
}

export default function ErrorMessage({
	title = "Error",
	description = "An unexpected error occurred. Please try again later or contact support if the problem persists.",
}: ErrorMessageProps) {
	return (
		<div className="max-w-2xl mx-auto p-4">
			<Alert className="bg-red-100 border-red-500 text-black">
				<AlertTriangle className="h-4 w-4 text-red-500" />
				<AlertTitle className="text-black font-semibold">{title}</AlertTitle>
				<AlertDescription className="text-black">
					{description}
				</AlertDescription>
			</Alert>
		</div>
	);
}

export function FieldErrorMessage({
	id,
	message,
}: {
	id?: string;
	message?: string;
}) {
	if (!message) return null;
	return (
		<p id={id} className="text-sm text-red-500 mt-1">
			{message}
		</p>
	);
}
