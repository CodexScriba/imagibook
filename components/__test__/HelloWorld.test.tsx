import React from "react";
import { render, screen } from "@testing-library/react";
import HelloWorld from "../HelloWorld";

describe("HelloWorld", () => {
	it("renders the correct heading", () => {
		render(<HelloWorld />);
		const headingElement = screen.getByRole("heading", { level: 1 });
		expect(headingElement).toHaveTextContent("Hello, World!");
	});
});
