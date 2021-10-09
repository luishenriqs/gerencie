import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import{ SignIn } from '../pages/SignIn';

const { Navigator, Screen } = createStackNavigator();

// Route to user authentication;
export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#312e38'},
      }}>
      <Screen
        name="SignIn" 
        component={SignIn} 
      />
    </Navigator>
  )
};
