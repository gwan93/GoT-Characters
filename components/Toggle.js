import React from "react";
import { Switch } from "react-native";
import { useTheme } from "../theme/ThemeContext";

export default function Toggle() {
  const { setScheme, isDark } = useTheme();

  const toggleScheme = () => {
    isDark ? setScheme("light") : setScheme("dark");
  };

  return (
    <Switch value={isDark} onValueChange={toggleScheme} />
  )
};
