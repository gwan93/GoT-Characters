import React, { useState, useEffect, createContext, useContext } from "react";
import { useColorScheme } from "react-native-appearance";
import { lightColors, darkColors } from "./colorThemes";

// Allows children components to have access to the state of darkMode
// to determine which color pallette to use to style components

export const ThemeContext = createContext({
  isDark: false,
  colors: lightColors,
  setScheme: () => {},
});

export const ThemeProvider = (props) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === "dark");

  useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme]);

  const defaultTheme = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme) => setIsDark(scheme === "dark"),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

// theme object returns {isDark, colors, setScheme}
export const useTheme = () => useContext(ThemeContext);
