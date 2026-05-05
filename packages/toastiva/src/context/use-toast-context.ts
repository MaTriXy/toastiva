import { useContext } from "react";
import { ToastThemeContext } from "./context";
import type { IResolvedToastTheme } from "./theme";

function useToastTheme(): IResolvedToastTheme {
  return useContext<IResolvedToastTheme>(ToastThemeContext);
}

export { useToastTheme };
