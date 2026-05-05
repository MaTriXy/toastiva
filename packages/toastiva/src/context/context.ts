import { createContext, type Context } from "react";
import { DEFAULT_THEME } from "./const";
import { IResolvedToastTheme } from "./theme";

const ToastThemeContext: Context<IResolvedToastTheme> =
  createContext<IResolvedToastTheme>(DEFAULT_THEME);

export { ToastThemeContext };
