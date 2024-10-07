import * as z from "zod";
import { characterSchema, step1Schema, step2Schema, formSchema } from ".schemas./schemas";
import { ageGroups } from "@/constants/ageGroups";
import { illustrationData } from "@/constants/IllustrationData";

// Mock the message imports
jest.mock("@/paraglide/messages", () => ({
  characters_errors_nameRequired: () => "Name is required",
  characters_errors_atLeastOne: () => "At least one character is required",
  illustration_errors_required: () => "Illustration style is required",
}));

describe("Character Schema", () => {
  it("should validate a valid character", () => {
    const validCharacter = {
      name: "John Doe",
      isMainCharacter: true,
      ageGroup: ageGroups[0].value,
      description: "A test character",
    };
    expect(() => characterSchema.parse(validCharacter)).not.toThrow();
  });

  it("should throw an error for an invalid name", () => {
    const invalidCharacter = {
      name: "J",
      isMainCharacter: true,
    };
    expect(() => characterSchema.parse(invalidCharacter)).toThrow();
  });
});

describe("Step 1 Schema", () => {
  it("should validate valid step 1 data", () => {
    const validStep1Data = {
      characters: [
        { name: "Character 1", isMainCharacter: true },
        { name: "Character 2", isMainCharacter: false },
      ],
    };
    expect(() => step1Schema.parse(validStep1Data)).not.toThrow();
  });

  it("should throw an error for empty characters array", () => {
    const invalidStep1Data = {
      characters: [],
    };
    expect(() => step1Schema.parse(invalidStep1Data)).toThrow();
  });
});

describe("Step 2 Schema", () => {
  it("should validate valid step 2 data", () => {
    const validStep2Data = {
      illustrationStyle: illustrationData[0].value,
      characterType: "human",
    };
    expect(() => step2Schema.parse(validStep2Data)).not.toThrow();
  });

  it("should throw an error for invalid illustration style", () => {
    const invalidStep2Data = {
      illustrationStyle: "invalid_style",
      characterType: "human",
    };
    expect(() => step2Schema.parse(invalidStep2Data)).toThrow();
  });
});

describe("Form Schema", () => {
  it("should validate a complete valid form", () => {
    const validForm = {
      characters: [{ name: "Character 1", isMainCharacter: true }],
      illustrationStyle: illustrationData[0].value,
      characterType: "animal",
      animalType: "Dog",
      isAnthropomorphic: true,
    };
    expect(() => formSchema.parse(validForm)).not.toThrow();
  });

  it("should throw an error for an incomplete form", () => {
    const invalidForm = {
      characters: [{ name: "Character 1", isMainCharacter: true }],
      // Missing illustrationStyle and characterType
    };
    expect(() => formSchema.parse(invalidForm)).toThrow();
  });
});