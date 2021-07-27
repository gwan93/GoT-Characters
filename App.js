import React from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';
import Application from './Application';
import { AppearanceProvider } from 'react-native-appearance';
import { ThemeProvider } from './theme/ThemeContext';

// This is the entry point for the application.

export default function App() {
  return (
    <AppearanceProvider>
      <ThemeProvider>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Application />
        </KeyboardAvoidingView>
      </ThemeProvider>
    </AppearanceProvider>
  );
};