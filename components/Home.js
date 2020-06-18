import React, { useState, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";
import { AuthContext } from "../App";


export const Home = ({ navigation }) => {
  const [season, onChangeSeason] = useState("");
  const [round, onChangeRound] = useState("");

  const user = useContext(AuthContext);

  async function logOut() {
    console.log(user)
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <View>
      <Button
        icon={<Icon name="search" size={15} color="white" />}
        title=" Search"
        onPress={() => navigation.navigate("Search Show")}
      />
      <Button
        icon={<Icon name="heart" size={15} color="white" />}
        title=" Favorite"
        onPress={() => navigation.navigate("Search Show")}
      />
      <Button
        icon={<Icon name="tv" size={15} color="white" />}
        title=" Tonight in TV"
        onPress={() => navigation.navigate("Search Show")}
      />
      <Button
        icon={<Icon name="random" size={15} color="white" />}
        title=" Random show"
        onPress={() => navigation.navigate("Search Show")}
      />
      <Button
        icon={<Icon name="random" size={15} color="white" />}
        title=" Logout"
        onPress={() => logOut()}
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
    padding: 15,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Home;
