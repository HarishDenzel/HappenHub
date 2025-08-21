import { SafeAreaView } from 'react-native';
import React from 'react';
import { AuthProvider } from "./src/utils/context/AuthContext";
import Navigation from './src/navigation/Navigation';
import { FavoritesProvider } from './src/utils/context/FavoritesContext';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n/i18n';
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18n}>
        <FavoritesProvider>
          <AuthProvider>

            <Navigation />

          </AuthProvider>
        </FavoritesProvider>
      </I18nextProvider>
    </SafeAreaView>
  );
}
