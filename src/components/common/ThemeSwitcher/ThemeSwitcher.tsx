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
      className="btn btn-square btn-ghost btn-sm"
    >
      <FiMoon className="block dark:hidden" aria-hidden="true" size={18} />
      <FiSun className="hidden dark:block" aria-hidden="true" size={18} />
    </Button>
  );
}