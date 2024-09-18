//app/book-creation/page.tsx
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import BookCreationForm from "./components/BookCreationForm";

const bookCreation = () => {
	return (
		<div>
			<Navbar />
			<BookCreationForm />
		</div>
	);
};

export default bookCreation;
