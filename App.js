
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import RewardsScreen from './screens/RewardsScreen';
import ShopScreen from './screens/ShopScreen';
import HistoryScreen from './screens/HistoryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Home: 'home',
              Recompensas: 'trophy',
              Tienda: 'cart',
              Historial: 'time',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: '#999',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Recompensas" component={RewardsScreen} />
        <Tab.Screen name="Tienda" component={ShopScreen} />
        <Tab.Screen name="Historial" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
