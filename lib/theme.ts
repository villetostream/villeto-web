export const THEME_COOKIE = "villeto-theme";
export type Theme = "light" | "dark";

export function isTheme(value: string | undefined): value is Theme {
  return value === "light" || value === "dark";
}
