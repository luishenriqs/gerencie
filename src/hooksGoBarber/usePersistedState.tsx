import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface ThemeState {
  data: string;
}

interface ThemeContextData {
  data: string;
  toggleTheme(title: string);
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

const StateThemeProvider: React.FC = ({children}) => {
  // Estado onde esta contido o valor do AsyncStorage se houver;
  const [data, setData] = useState('light');
  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const title = await AsyncStorage.getItem('@Theme:title');

      if (title) {
        setData(JSON.parse(title));
      }
    }
    loadStoragedData();
  }, []);

  /* **************************[TOGGLETHEME]******************************* */
  // Selecionando o tema;
  const toggleTheme = useCallback(async title => {
    // Seta o tema no AsyncStorage e no estado;
    await AsyncStorage.setItem('@Theme:title', JSON.stringify(title));
    setData(title);
  }, []);
  /* ************************************************************************ */

  return (
    <ThemeContext.Provider value={{data, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within an StateThemeProvider');
  }

  return context;
}

export {StateThemeProvider, useTheme};
