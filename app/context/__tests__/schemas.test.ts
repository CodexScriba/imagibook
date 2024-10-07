import * as z from "zod";
import { characterSchema, step1Schema, step2Schema, formSchema } from "@/app/context/schemas";
import { illustrationData } from "@/constants/IllustrationData";

// Mock the message imports dynamically
jest.mock("@/paraglide/messages", () => {
  const originalModule = jest.requireActual("@/paraglide/messages");

  return {
    ...originalModule,
    characters_errors_nameRequired: () => "Name is required",
    characters_errors_atLeastOne: () => "At least one character is required",
    illustration_errors_required: () => "Illustration style is required",
    characters_placeholders_ageGroup: () => "Age group placeholder",
    characters_ageGroup_baby: () => "Baby 0-1",
    characters_ageGroup_toddler: () => "Toddler 1-3",
    characters_ageGroup_kid: () => "Kid 3-12",
    characters_ageGroup_teen: () => "Teen 13-19",
    characters_ageGroup_adult: () => "Adult 20-65",
    characters_ageGroup_elderly: () => "Elderly 65+",
    // Automatically mock any illustrationData_* functions
    illustrationData_disneyStyle_title: () => "Disney Style",
    illustrationData_disneyStyle_description: () => "Disney-style illustrations known for their charm.",
    illustrationData_aquarelle_title: () => "Aquarelle",
    illustrationData_aquarelle_description: () => "Soft and fluid watercolor illustrations for a dreamy experience.",
    illustrationData_storybookIllustration_title: () => "Storybook Illustration",
    illustrationData_storybookIllustration_description: () => "Classic and enchanting illustrations reminiscent of traditional children's books.",
    illustrationData_pixarStyle_title: () => "Pixar Style",
    illustrationData_pixarStyle_description: () => "Richly detailed illustrations with vibrant colors, lifelike textures, and expressive characters.",
    illustrationData_manga_title: () => "Manga",
    illustrationData_manga_description: () => "Dynamic and stylized illustrations with bold lines, expressive characters, and a dramatic sense of storytelling.",
    illustrationData_flatDesign_title: () => "Flat Design",
    illustrationData_flatDesign_description: () => "Modern and minimalist illustrations with bold colors and simple shapes, offering a clean and playful visual style.",
  };
});

describe("Character Schema", () => {
  it("should validate a valid character", () => {
    const validCharacter = {
      name: "John Doe",
      isMainCharacter: true,
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
