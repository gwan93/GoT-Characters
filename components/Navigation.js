import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import NavigationButton from './NavigationButton';
import { useTheme } from '../theme/ThemeContext';

export default function Navigation(props) {

  // Component styling begins
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    navigationContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    navigationBar: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 4,
    },
    navigationText: {
      fontSize: 15,
      padding: 7,
      paddingTop: 10,
      borderWidth: 1,
      borderColor: colors.border,
      color: colors.text,
      backgroundColor: colors.cardBackground,
    },
    navigationBtnFirst: {
      borderWidth: 1,
      borderColor: colors.border,
      borderTopLeftRadius: 7,
      borderBottomLeftRadius: 7,
      backgroundColor: colors.cardBackground,
    },
    navigationBtn: {
      borderTopColor: colors.border,
      borderTopWidth: 1,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      backgroundColor: colors.cardBackground,
    },
    navigationBtnLast: {
      borderWidth: 1,
      borderColor: colors.border,
      borderTopRightRadius: 7,
      borderBottomRightRadius: 7,
      backgroundColor: colors.cardBackground,
    },
    gotoControls: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 5,
    },
    gotoText: {
      borderWidth: 1,
      borderColor: colors.border,
      paddingLeft: 5,
      paddingRight: 5,
      borderTopLeftRadius: 7,
      borderBottomLeftRadius: 7,
      backgroundColor: colors.inputBackground,
      minWidth: 80,
    },
    gotoButton: {
      color: colors.goToButton,
    },
    btnContainer: {
      borderWidth: 1,
      borderColor: colors.border,
      borderLeftWidth: 0,
      padding: 9,
      borderTopRightRadius: 7,
      borderBottomRightRadius: 7,
      backgroundColor: colors.goBtn,
    },
  });
  // End of component styling

  const { page, fetchNewPage, lastPageNumber, goToTop } = props;
  const [ goToPage, setGoToPage ] = useState("");

  // Page Handler Functions
  // First and previous page handlers are disabled when user is on page 1
  // Next and last page handlers are disabled when user is on the last page

  const firstPageHandler = () => {
    if (page === 1) return;
    goToTop();
    fetchNewPage(1);
  };

  const previousPageHandler = () => {
    if (page === 1) return;
    goToTop();
    fetchNewPage(page - 1);
  };

  const nextPageHandler = () => {
    if (page === lastPageNumber) return;
    goToTop();
    fetchNewPage(page + 1);
  };

  const lastPageHandler = () => {
    if (page === lastPageNumber) return;
    goToTop();
    fetchNewPage(lastPageNumber);
  };

  const gotoPage = () => {
    if (goToPage > lastPageNumber) {
      Alert.alert('Page Value Out of Range', `Please enter a value between 1 and ${lastPageNumber}.`, [{ text: "OK"}]);
      return;
    }
    goToTop();
    fetchNewPage(Number(goToPage));
    setGoToPage("");
  };

  return (
    <View style={styles.navigationContainer}>
      <View style={styles.navigationBar}>
        <NavigationButton style={styles.navigationBtnFirst} icon="chevrons-left" disabled={page === 1 ? true : false} onPress={firstPageHandler}/>
        <NavigationButton style={styles.navigationBtn} icon="chevron-left" disabled={page === 1 ? true : false} onPress={previousPageHandler}/>
        <Text style={styles.navigationText}>Page {page}</Text>
        <NavigationButton style={styles.navigationBtn} icon="chevron-right" disabled={page === 214 ? true : false} onPress={nextPageHandler}/>
        <NavigationButton style={styles.navigationBtnLast} icon="chevrons-right" disabled={page === 214 ? true : false} onPress={lastPageHandler}/>
      </View>
      <View style={styles.gotoControls}>
        <TextInput style={styles.gotoText} placeholder="Go to page" onChangeText={(textValue) => setGoToPage(textValue)}/>
        <TouchableOpacity onPress={gotoPage} style={styles.btnContainer}>
          <Text style={styles.gotoButton}>Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
