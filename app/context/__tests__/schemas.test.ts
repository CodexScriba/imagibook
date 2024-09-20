import { z } from "zod";
import { formSchema } from "../schemas";

describe("formSchema", () => {
	it("should validate a valid form object", () => {
		const validForm = {
			mode: "magicWand",
			characters: [],
			storyOverview: "",
		};
		expect(() => formSchema.parse(validForm)).not.toThrow();
	});

	it("should throw an error for invalid mode", () => {
		const invalidForm = {
			mode: "invalidMode",
			characters: [],
			storyOverview: "",
		};
		expect(() => formSchema.parse(invalidForm)).toThrow(z.ZodError);
	});

	it("should throw an error for missing required fields", () => {
		const incompleteForm = {
			mode: "storybookStudio",
		};
		expect(() => formSchema.parse(incompleteForm)).toThrow(z.ZodError);
	});

	it("should allow both magicWand and storybookStudio modes", () => {
		const magicWandForm = {
			mode: "magicWand",
			characters: [],
			storyOverview: "",
		};
		const storybookStudioForm = {
			mode: "storybookStudio",
			characters: [],
			storyOverview: "",
		};
		expect(() => formSchema.parse(magicWandForm)).not.toThrow();
		expect(() => formSchema.parse(storybookStudioForm)).not.toThrow();
	});

	it("should validate characters field as an array", () => {
		const formWithInvalidCharacters = {
			mode: "magicWand",
			characters: "not an array",
			storyOverview: "",
		};
		expect(() => formSchema.parse(formWithInvalidCharacters)).toThrow(
			z.ZodError,
		);
	});

	it("should validate storyOverview field as a string", () => {
		const formWithInvalidStoryOverview = {
			mode: "storybookStudio",
			characters: [],
			storyOverview: 123,
		};
		expect(() => formSchema.parse(formWithInvalidStoryOverview)).toThrow(
			z.ZodError,
		);
	});
});
