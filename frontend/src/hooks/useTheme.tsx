import React, { createContext, useState, useContext } from "react";

type Theme = "dark" | "light";

type GlobalContext = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

export const GlobalContext = createContext<GlobalContext | null>(null);

export function GlobalThemeProvider({
  children,
}: GlobalContextProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <GlobalContext.Provider value={{ theme, setTheme }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalTheme() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
}

// Usage:
// const { theme, setTheme } = useGlobalContext();
