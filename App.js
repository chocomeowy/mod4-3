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
    <Stack.Navigator mode ="modal">
      <Stack.Screen name = "Chat" component={ChatScreen} />
      <Stack.Screen name = "Login" component={LoginScreen} />

    </Stack.Navigator>
    </NavigationContainer>
  );
  }

