//app/book-creation/page.tsx
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import BookCreationForm from "./components/step1-characters/BookCreationForm";
import Characters from "./components/step1-characters/Characters";

const bookCreation = () => {
	return (
		<div>
			<Characters />
		</div>
	);
};

export default bookCreation;
