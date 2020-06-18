import React, { useState, useEffect, createContext } from "react";

import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import { firebaseConfig } from "./constants/ApiKeys";
import AuthStack from "./nav-stacks/authstack";
import NormalStack from "./nav-stacks/normalstack";

export const AuthContext = createContext(null);

export default function App() {
  const [isAuthenticationReady, setisAuthenticationReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  function onAuthChanged(user) {
    setUser(user);
    console.log(user);
    setisAuthenticationReady(true);
    setIsAuthenticated(!!user);
    if (user) {
      console.log("mam uzytkjownika");
    }
  }

  return user ? (
    <AuthContext.Provider value={user}>
      <NormalStack />
    </AuthContext.Provider>
  ) : (
    <AuthStack />
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
