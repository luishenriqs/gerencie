import React from 'react';

import {AuthProvider} from './auth';
import {StateThemeProvider} from './usePersistedState';

const AppProvider: React.FC = ({children}) => (
  <AuthProvider>
    <StateThemeProvider>{children}</StateThemeProvider>
  </AuthProvider>
);

export default AppProvider;
