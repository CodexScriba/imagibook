//app/book-creation/layout.tsx

import type React from "react";
import { FormProvider } from "../context/FormContext";
import Navbar from "../components/Navbar/Navbar";

export default function BookCreationLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<FormProvider>
			<Navbar />
			<div className="mt-10 w-full flex items-center justify-center">
				<div className="w-full max-w-2xl">{children}</div>
			</div>
		</FormProvider>
	);
}
