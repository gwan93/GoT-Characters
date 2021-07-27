import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

export default function NavigationButton(props) {
  const { colors } = useTheme();
  const { icon, disabled, onPress, style } = props;

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={style}>
      <Feather name={icon} size={36} color={disabled ? "grey" : colors.text} />
    </TouchableOpacity>
  );
}
