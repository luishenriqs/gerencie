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
    <Drawer.Navigator>
      <Drawer.Screen name="Appointments" component={Appointments}  />
      <Drawer.Screen name="Delivery" component={Delivery} />
      <Drawer.Screen name="Financial" component={Financial} />
      <Drawer.Screen name="Sales" component={Sales} />
    </Drawer.Navigator>
  );
}

export default AppRoutes;