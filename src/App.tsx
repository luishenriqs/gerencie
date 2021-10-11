import 'react-native-gesture-handler';
/* Necessária a instalação para android: ==> yarn add intl */
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import * as React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { View, StatusBar } from 'react-native';
import { AuthProvider } from './hooks/Auth';
import { Routes } from './routes/index.routes';
import theme from './global/styles/theme';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export default function App() {
  //=> expo install expo-font @expo-google-fonts/poppins;
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  //=> expo install expo-app-loading;
  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
