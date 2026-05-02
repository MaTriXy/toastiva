import type { IToastivaProviderProps } from "../typings";
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ToastivaToaster } from "./ToastivaToaster";

interface IToastivaProviderContext {
  registerChildProvider: () => () => void;
}

const ToastivaProviderContext =
  createContext<IToastivaProviderContext | null>(null);

export const ToastivaProvider: React.MemoExoticComponent<
  React.FC<IToastivaProviderProps>
> = memo(
  ({ children, ...config }: IToastivaProviderProps): React.JSX.Element &
    React.ReactNode &
    React.ReactElement => {
    const parent = useContext(ToastivaProviderContext);
    const [childProviderCount, setChildProviderCount] = useState(0);
    const registerChildProvider = useCallback(() => {
      setChildProviderCount((count) => count + 1);
      return () => {
        setChildProviderCount((count) => Math.max(0, count - 1));
      };
    }, []);
    const contextValue = useMemo(
      () => ({ registerChildProvider }),
      [registerChildProvider],
    );

    useEffect(() => {
      return parent?.registerChildProvider();
    }, [parent]);

    return (
      <ToastivaProviderContext.Provider value={contextValue}>
        {children}
        <ToastivaToaster {...config} disabled={childProviderCount > 0} />
      </ToastivaProviderContext.Provider>
    );
  },
);

export default ToastivaProvider;
