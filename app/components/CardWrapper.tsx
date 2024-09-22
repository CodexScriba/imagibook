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
		<Card className="w-full">
			<CardHeader className="space-y-6 text-center">
				<CardTitle className="pt-6">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default CardWrapper;
