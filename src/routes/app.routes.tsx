import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Appointments } from '../pages/Appointments';
import { Delivery } from '../pages/Delivery';
import { FinancialRoutes } from '../pages/Financial/Financial.routes';
import { Sales } from '../pages/Sales';

const Drawer = createDrawerNavigator();

// Route to app menu;
export function AppRoutes() {
  return (
    <Drawer.Navigator
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
      <Drawer.Screen name="Agendamentos" component={Appointments} />
      <Drawer.Screen name="Entregas" component={Delivery} />
      <Drawer.Screen name="Financeiro" component={FinancialRoutes} />
      <Drawer.Screen name="Vendas" component={Sales} />
    </Drawer.Navigator>
  );
};