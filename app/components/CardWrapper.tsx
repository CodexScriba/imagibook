// app/components/CardWrapper.tsx

import type React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface CardWrapperProps {
	children: React.ReactNode;
	title: React.ReactNode;
	description: string;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
	children,
	title,
	description,
}) => {
	return (
		<Card className="w-full max-w-4xl shadow-lg overflow-hidden">
			<CardHeader className="space-y-4 text-center p-4">
				<CardTitle className="text-2xl font-semibold">{title}</CardTitle>
				<CardDescription className="text-gray-600">
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent className="p-2 overflow-hidden">{children}</CardContent>
		</Card>
	);
};

export default CardWrapper;
