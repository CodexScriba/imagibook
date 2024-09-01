import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"], // Enable dark mode with a class
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))", // Border color
				input: "hsl(var(--input))", // Input background
				ring: "hsl(var(--ring))", // Focus ring color
				background: "hsl(var(--background))", // Background color
				foreground: "hsl(var(--foreground))", // Foreground (text) color
				primary: {
					DEFAULT: "hsl(var(--primary))", // Primary color
					foreground: "hsl(var(--primary-foreground))", // Primary text color
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))", // Secondary color
					foreground: "hsl(var(--secondary-foreground))", // Secondary text color
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))", // Destructive (error) color
					foreground: "hsl(var(--destructive-foreground))", // Destructive text color
				},
				muted: {
					DEFAULT: "hsl(var(--muted))", // Muted color (used for less prominent text)
					foreground: "hsl(var(--muted-foreground))", // Muted text color
				},
				accent: {
					DEFAULT: "hsl(var(--accent))", // Accent color
					foreground: "hsl(var(--accent-foreground))", // Accent text color
				},
				popover: {
					DEFAULT: "hsl(var(--popover))", // Popover background color
					foreground: "hsl(var(--popover-foreground))", // Popover text color
				},
				card: {
					DEFAULT: "hsl(var(--card))", // Card background color
					foreground: "hsl(var(--card-foreground))", // Card text color
				},
			},
			borderRadius: {
				lg: "var(--radius)", // Large border radius
				md: "calc(var(--radius) - 2px)", // Medium border radius
				sm: "calc(var(--radius) - 4px)", // Small border radius
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")], // Ensure you have the animate plugin installed
};

export default config;
