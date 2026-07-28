"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { THEME_COOKIE, type Theme } from "./theme";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * The server already decided the correct theme by reading the
 * `villeto-theme` cookie in app/layout.tsx and rendering
 * `<html data-theme="...">` before hydration — so there is no
 * flash-of-wrong-theme to fix here. This provider only needs to
 * handle the *next* toggle: flip the attribute instantly and persist
 * the choice back to the cookie (1 year, so it's readable on the
 * next server render too).
 */
export function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: Theme;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
