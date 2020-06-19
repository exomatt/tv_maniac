import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationContainer from "@react-navigation/native/src/NavigationContainer";
import { StyleSheet, Text, View } from "react-native";
import Home from "../components/Home";
import SearchShow from "../components/SearchShow";
import ShowDetails from "../components/ShowDetails";
import Episode from "../components/Episode";
import Cast from "../components/Cast";
import Person from "../components/Person";
import Favorite from "../components/Favorite";
import Tonight from "../components/Tonight";
import RandomShow from "../components/RandomShow";

const Stack = createStackNavigator();

export default function NormalStack() {
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
        <Stack.Screen name="Episode" component={Episode} />
        <Stack.Screen name="Cast" component={Cast} />
        <Stack.Screen name="Person" component={Person} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="Tonight in TV" component={Tonight} />
        <Stack.Screen name="Random Show" component={RandomShow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
