/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import {useAuth} from '../hooks/auth';

const Routes: React.FC = () => {
  const {user, loading} = useAuth();

  if (loading) {
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#999" />
    </View>;
  }

  /*
  O User esta autenticado?
    Se sim: Direcionado para <AppRoutes />;
    Se não: Direcionado para <AuthRoutes />;
  */
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
