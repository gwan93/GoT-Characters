import React from "react";
import Character from "./Character";
import { StyleSheet, Dimensions, View } from "react-native";

export default function Characters(props) {
  const { characters, page } = props;

  return (
    <View style={styles.allCharacters}>
      {characters[page].map((character) => {
        return <Character key={character.url} character={character} />;
      })}
    </View>
  );
}

// Get values of the dimension of the device
const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const styles = StyleSheet.create({
  allCharacters: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
});
