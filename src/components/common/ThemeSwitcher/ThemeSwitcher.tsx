import * as React from "react";
import { Button } from "~/components/primitives";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";

export interface IThemeSwitcherProps {}

export function ThemeSwitcher(props: IThemeSwitcherProps) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      aria-label="Toggle Dark Mode"
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="btn btn-ghost btn-circle"
    >
      <FiMoon className="block dark:hidden" aria-hidden="true" />
      <FiSun className="hidden dark:block" aria-hidden="true" />
    </Button>
  );
}
