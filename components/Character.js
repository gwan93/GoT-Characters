import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from '../theme/ThemeContext';

export default function Character(props) {

  // Component styling begins
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    characterCard: {
      flex: 1,
      margin: 10,
      marginTop: 2,
      marginBottom: 2,
      minHeight: 70,
      borderColor: colors.border,
      borderWidth: 0.8,
      borderRadius: 10,
      backgroundColor: colors.cardBackground,
      padding: 5,
      paddingBottom: 0,
    },
    characterHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    characterName: {
      fontSize: 20,
      fontWeight: "bold",
      margin: 4,
      color: colors.text,
    },
    characterCulture: {
      borderColor: colors.cultureBorder,
      borderWidth: 0.5,
      borderRadius: 10,
      padding: 4,
      margin: 4,
      color: colors.text,
    },
    characterDetails: {
      margin: 4,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
      paddingBottom: 0,
    },
    characterText: {
      flex: 1,
    },
    listItem: {
      marginBottom: 3,
      color: colors.text,
    },
    characterExpand: {
      alignSelf: "flex-end",
      padding: 5,
    },
    characterBold: {
      fontWeight: "bold",
      color: colors.text,
    },
  });
  // End of component styling

  const {
    aliases,
    books,
    born,
    culture,
    died,
    gender,
    name,
    playedBy,
    titles,
    tvSeries,
  } = props.character;
  
  const [characterDetails, setCharacterDetails] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setCharacterDetails({ ...props.character });
    cleanseCharacterDetails(characterDetails);
  }, []);

  // Cleans up data received from API to be more human readable
  const cleanseCharacterDetails = () => {
    // Grab the last character of the URL in which the character appears in
    // eg. 'https://www.anapioficeandfire.com/api/books/11' -> returns '11'
    // And combines all those individual characters into a human readable string
    const booksArray = books.map((book) => {
      return book.substring(book.lastIndexOf("/") + 1);
    });
    let booksString = "";
    for (const book of booksArray) {
      if (book === booksArray[booksArray.length - 1]) {
        booksString += book;
      } else {
        booksString += book + ", ";
      }
    }

    // Combine array elements into a single string
    const aliasesString = aliases.join(", ");
    const playedByString = playedBy.join(", ");
    const titlesString = titles.join(", ");
    const tvSeriesString = tvSeries.join(", ");

    setCharacterDetails((prev) => ({
      ...prev,
      books: booksString,
      aliases: aliasesString,
      playedBy: playedByString,
      titles: titlesString,
      tvSeries: tvSeriesString,
    }));
  };

  return (
    <TouchableOpacity
      style={styles.characterCard}
      onPress={() => setIsExpanded(!isExpanded)}
    >
      <View style={styles.characterHeader}>
        <Text style={styles.characterName}>{name ? name : aliases[0]}</Text>
        {culture ? (
          <Text style={styles.characterCulture}>{culture}</Text>
        ) : null}
      </View>

      <View style={styles.characterDetails}>
        {/* Character information displayed if available */}
        <View style={styles.characterText}>

          <Text style={styles.listItem}>
            <Text style={styles.characterBold}>
              {`Appears in ${books.length === 1 ? "book" : "books"}`}{" "}
            </Text>
            {characterDetails.books}
          </Text>

          {born ? (
            <Text style={styles.listItem}>
              <Text style={styles.characterBold}>Born </Text>{born}
            </Text>
          ) : null}

          {died ? (
            <Text style={styles.listItem}>
              <Text style={styles.characterBold}>Died </Text>{died}
            </Text>
          ) : null}

          {isExpanded ? null : (
            <Text style={styles.listItem}>...</Text>
          )}

          {/* Expandable character information */}
          {isExpanded ? (
            <View>

              {aliases[0] ? (
                <Text style={styles.listItem}>
                  <Text style={styles.characterBold}>
                    {aliases.length === 1 ? "Alias:" : "Aliases:"}{" "}
                  </Text>
                  {characterDetails.aliases}
                </Text>
              ) : null}

              {gender ? (
                <Text style={styles.listItem}>
                  <Text style={styles.characterBold}>Gender: </Text>
                  {gender}
                </Text>
              ) : null}

              {playedBy[0] ? (
                <Text style={styles.listItem}>
                  <Text style={styles.characterBold}>Played By: </Text>
                  {characterDetails.playedBy}
                </Text>
              ) : null}

              {titles[0] ? (
                <Text style={styles.listItem}>
                  <Text style={styles.characterBold}>
                    {titles.length === 1 ? "Title:" : "Titles:"}{" "}
                  </Text>
                  {characterDetails.titles}
                </Text>
              ) : null}

              {tvSeries[0] ? (
                <Text style={styles.listItem}>
                  <Text style={styles.characterBold}>TV Series: </Text>
                  {characterDetails.tvSeries}
                </Text>
              ) : null}

            </View>
          ) : null}
        </View>

        {/* Expand view button */}
        <View style={styles.characterExpand}>
          <Text>
            {isExpanded ? (
              <FontAwesome style={styles.listItem} name="chevron-up" size={12} color="black" />
            ) : (
              <FontAwesome style={styles.listItem} name="chevron-down" size={12} color="black" />
            )}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}