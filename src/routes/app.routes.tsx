import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Appointments from '../pages/Appointments';
import Delivery from '../pages/Delivery';
import Financial from '../pages/Financial';
import Sales from '../pages/Sales';

const Drawer = createDrawerNavigator();

// Route to app menu;
const AppRoutes: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#f3a723',
        width: 200,
      }}
      drawerContentOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#345995',
        itemStyle: {borderRadius: 8},
        labelStyle: {fontWeight: 'bold'}
      }}
    >
      <Drawer.Screen name="Agendamentos" component={Appointments} />
      <Drawer.Screen name="Entregas" component={Delivery} />
      <Drawer.Screen name="Financeiro" component={Financial} />
      <Drawer.Screen name="Vendas" component={Sales} />
    </Drawer.Navigator>
  );
}

export default AppRoutes;