import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { List } from './List';
import { Register } from './Register';
// import { Resumo } from '../Resume';

const { Navigator, Screen } = createBottomTabNavigator();

export function FinancialRoutes () {
    const theme = useTheme();
    return (
        <Navigator
            tabBarOptions= {{
                activeTintColor: theme.colors.secondary,
                inactiveTintColor: theme.colors.title,
                labelPosition: 'beside-icon',
                style: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 50,
                }
            }}
        >
            <Screen
                name='Lista' 
                component={List} 
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <Screen 
                name='Cadastro' 
                component={Register} 
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name='attach-money'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <Screen 
                name='Resumo' 
                component={Register} 
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name='pie-chart'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </Navigator>
    );
}