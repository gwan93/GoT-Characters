import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, SafeAreaView, StatusBar, Platform, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Characters from './components/Characters';
import Navigation from './components/Navigation';
import Toggle from './components/Toggle';
import { useTheme } from './theme/ThemeContext';

export default function Application() {

  // Component styling begins
  const { colors, isDark } = useTheme();
  const styles = StyleSheet.create({
    // Leaves space at the top for the notch on iOS devices
    safeAreaView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    // Leaves space at the top for the icon tray on android devices
    iconBar: {
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    pageTitle: {
      padding: 5,
      paddingTop: 15,
      fontSize: 22,
      fontWeight: "bold",
      textAlign: 'center',
      color: colors.text,
    },
    pageAuthor: {
      padding: 5,
      paddingBottom: 15,
      fontSize: 18,
      textAlign: 'center',
      color: colors.text,
    },
    loadingText: {
      color: colors.text,
    },
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingBottom: 150,
    },
  });
  // End of component styling
  
  const [ characters, setCharacters ] = useState({ 1: [] });
  const [ page, setPage ] = useState(1);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ lastPageNumber, setLastPageNumber ] = useState(undefined);
  const scrollRef = useRef();

  // On first render fetch the first 10 characters from the API
  // Also extract the value of last page number from the response's link header
  useEffect(() => {
    axios.get('https://anapioficeandfire.com/api/characters/')
    .then(response => {
      // The link header will look like "<https://anapioficeandfire.com/api/characters?page=214&pageSize=10>"
      // This approach will work as more characters are added to the api in the future and last page value changes
      const indexOfPageNumber = response.headers.link.lastIndexOf("page=");
      const indexOfPageSize = response.headers.link.lastIndexOf("&pageSize=");
      const lastPageNumberFromURL = response.headers.link.slice(indexOfPageNumber + 5, indexOfPageSize);

      setLastPageNumber(Number(lastPageNumberFromURL));
      setCharacters({...characters, 1: response.data});
      setIsLoading(false);
    });
  }, []);

  const fetchNewPage = (page) => {
    // If the page data doesn't exist, fetch new data from api
    // create new key in characters state, set the value to be the response.data
    // update page state
    if (!characters[page]) {
      setIsLoading(true);
      axios.get(`https://www.anapioficeandfire.com/api/characters?page=${page}`)
      .then(response => {
        setCharacters({...characters, [page]: response.data})
        setPage(page);
        setIsLoading(false);
      });
    } else {
      setPage(page);
    }
  };

  const goToTop = () => scrollRef.current?.scrollTo({y: 0, animated: false});

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar barStyle={isDark || Platform.OS === "android" ? "light-content" : "dark-content"} />
      <View style={styles.iconBar} />
        <ScrollView contentContainerStyle={styles.container} ref={scrollRef}>
          {/* Title, Author, and Dark Mode Toggle */}
          <Text style={styles.pageTitle}>A Song of Ice and Fire Characters</Text>
          <Text style={styles.pageAuthor}>George R. R. Martin</Text>
          <Toggle />

          {/* Shows loading when fetching data or characters/navigation when fetched data is available */}
          {isLoading ? (
            <View>
              <Text style={styles.loadingText}>Loading data. Please wait.</Text>
              <ActivityIndicator size="large" color={colors.text}/>
            </View>
          ) : (
            <View>
              <Characters characters={characters} page={page}/>
              {/* Navigation buttons and Go To Page component*/}
              <Navigation page={page} fetchNewPage={fetchNewPage} lastPageNumber={lastPageNumber} goToTop={goToTop}></Navigation>
            </View>
            )}
        </ScrollView>
    </SafeAreaView>
  );
};

