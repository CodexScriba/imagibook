"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch"; // Assuming you have the ShadCN Switch added to your components

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Wait until after client-side hydration to show the switch
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return null;
  }

  const isDarkMode = theme === "dark";

  const handleChange = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
      <Switch checked={isDarkMode} onCheckedChange={handleChange} />
    </div>
  );
};

export default ThemeSwitcher;
