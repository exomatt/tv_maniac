import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert, Vibration } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";
import { AuthContext } from "../App";
import { ShakeEvent } from "./ShakeEvent";

export const RandomShow = ({ navigation }) => {

  useEffect(() => {
    ShakeEvent.addListener(() => {
      Vibration.vibrate(1000);
      getRandomShow();
    });
    return () => {
      ShakeEvent.removeListener();
    };
  }, []);

  async function getRandomShow() {
    let randomId = String(Math.floor(Math.random() * (40000 - 1)) + 1);

    const res = await fetch(`http://api.tvmaze.com/shows/${randomId}`);
    res
      .json()
      .then((res) => {
        let obj = JSON.parse(JSON.stringify(res));
        console.log(obj)
         navigation.navigate("Show Details", {
           show: obj,
         });
      })
      .catch((err) => {
        console.log("Error", err);
      });
   
  }

  
  return (
    <View>
      <Button
        buttonStyle={styles.btn}
        icon={<Icon name="random" size={15} color="white" />}
        title=" Get Random Show"
        onPress={() => getRandomShow()}
      />
      <Button
        buttonStyle={styles.btn}
        icon={<Icon name="signing" size={15} color="white" />}
        title=" You can shake it"
        disabled={true}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 15,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  btn: {
    backgroundColor: "#8F00FF",
    padding: 15,
    margin: 5,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default RandomShow;
