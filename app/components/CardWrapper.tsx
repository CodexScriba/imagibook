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
		<Card className="w-full max-w-4xl flex flex-col shadow-lg">
			<CardHeader className="space-y-4 text-center p-6">
				<CardTitle className="text-2xl font-semibold">{title}</CardTitle>
				<CardDescription className="text-gray-600">
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-grow flex flex-col justify-between p-6">
				<div className="w-4/5 mx-auto space-y-6">{children}</div>
			</CardContent>
		</Card>
	);
};

export default CardWrapper;
