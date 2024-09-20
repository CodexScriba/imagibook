//app/book-creation/page.tsx
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import BookCreationForm from "./components/BookCreationForm";
import Characters from "./components/Characters";

const bookCreation = () => {
	return (
		<div>
			<Characters />
		</div>
	);
};

export default bookCreation;
