// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Ensure component is mounted before accessing the theme
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null; // Avoids mismatch during server-side rendering
	return (
		<button
			type="button"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300"
			aria-label="Toggle Theme"
		>
			{theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
		</button>
	);
}
