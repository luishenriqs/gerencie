import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Appointments } from '../pages/Appointments';
import { Delivery } from '../pages/Delivery';
import { FinancialRoutes } from '../pages/Financial/Financial.routes';
import { Sales } from '../pages/Sales';

const { Navigator, Screen } = createDrawerNavigator();

// Route to app menu;
export function AppRoutes() {
  return (
    <Navigator
      drawerStyle={{
        backgroundColor: '#1780A1',
        width: 200,
      }}
      drawerContentOptions={{
        activeTintColor: '#FFF',
        inactiveTintColor: '#723C70',
        itemStyle: {borderRadius: 8},
        labelStyle: {fontWeight: 'bold'}
      }}
    >
      <Screen name="Financeiro" component={FinancialRoutes} />
      <Screen name="Agendamentos" component={Appointments} />
      <Screen name="Entregas" component={Delivery} />
      <Screen name="Vendas" component={Sales} />
    </Navigator>
  );
};