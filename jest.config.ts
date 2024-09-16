import type { Config } from "jest";
import nextJest from "next/jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const createJestConfig = nextJest({
	dir: "./",
});

const config: Config = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testEnvironment: "jest-environment-jsdom",
	testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: "<rootDir>/",
	}),
};

export default createJestConfig(config);
