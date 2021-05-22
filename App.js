import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import ChatScreen from "./screens/ChatScreen";
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name = "LoginScreen" component={LoginScreen} />
      <Stack.Screen name = "ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
  }

