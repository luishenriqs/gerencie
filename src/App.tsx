import * as React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './routes/app.routes';
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
     <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#312e38"
        translucent
      />
      <ThemeProvider theme={theme}>
        <View style={{flex: 1, backgroundColor: '#312e38'}}>
          <AppRoutes />
        </View>
      </ThemeProvider>
    </NavigationContainer>
  );
}
