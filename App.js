import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationContainer from "@react-navigation/native/src/NavigationContainer";
import Home from "./components/Home";
import { StyleSheet, Text, View } from "react-native";
import SearchShow from "./components/SearchShow";
import ShowDetails from "./components/ShowDetails";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="TV Maniac" component={Home} />
        <Stack.Screen
          name="Search Show"
          component={SearchShow}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Show Details" component={ShowDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
