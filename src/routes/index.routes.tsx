/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {View, ActivityIndicator} from 'react-native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import {useAuth} from '../hooks/auth';

export function Routes() {
  const { user } = useAuth();
  return(
      <NavigationContainer>
          {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
  )
}