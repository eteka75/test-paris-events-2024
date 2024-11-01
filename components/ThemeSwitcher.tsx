"use client";
import { Moon, SunMedium, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex dark:border  gap-1 bg-slate-100 dark:bg-slate-700/50 rounded-full mb-4">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 text-sm rounded-full ${
          theme === "light"
            ? "bg-white text-gray-800 border shadow-sm"
            : "text-gray-600"
        }`}
        aria-label="Light mode"
      >
        <SunMedium />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full ${
          theme === "dark"
            ? "bg-background/40 text-white shadow-sm"
            : "text-gray-600"
        }`}
        aria-label="Dark mode"
      >
        <Moon />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-2 rounded-full ${
          theme === "system"
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-600"
        }`}
        aria-label="System mode"
      >
        <Monitor />
      </button>
    </div>
  );
};

export { ThemeSwitcher };
