"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

export function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-primary)] shadow-[0_8px_24px_-8px_rgba(10,15,13,0.3)] transition-transform hover:scale-105 active:scale-95"
    >
      {isDark ? <Sun className="size-5" strokeWidth={2} /> : <Moon className="size-5" strokeWidth={2} />}
    </button>
  );
}
