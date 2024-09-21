// components/CardWrapper.tsx
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
	title: string;
	description: string;
}

const CardWrapper: React.FC<CardWrapperProps> = ({
	children,
	title,
	description,
}) => {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default CardWrapper;
