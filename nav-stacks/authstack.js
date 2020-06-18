import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationContainer from "@react-navigation/native/src/NavigationContainer";
import { StyleSheet, Text, View } from "react-native";
import Login from "../components/Login";
import Register from "../components/Register";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
