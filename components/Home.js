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
        buttonStyle={styles.btn}
      />
      <Button
        buttonStyle={styles.btn}
        icon={<Icon name="heart" size={15} color="white" />}
        title=" Favorite"
        onPress={() => navigation.navigate("Favorite")}
      />
      <Button
        buttonStyle={styles.btn}
        icon={<Icon name="tv" size={15} color="white" />}
        title=" Tonight in TV"
        onPress={() => navigation.navigate("Tonight in TV")}
      />
      <Button
        buttonStyle={styles.btn}
        icon={<Icon name="random" size={15} color="white" />}
        title=" Random show"
        onPress={() => navigation.navigate("Random Show")}
      />
      <Button
        buttonStyle={styles.btnLogout}
        titleStyle={styles.tittle}
        icon={<Icon name="sign-out" size={15} color="#8F00FF" />}
        title=" Logout"
        type="outline"
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
    backgroundColor: "#8F00FF",
    padding: 15,
    margin: 5,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  btnLogout: {
    color: "#8F00FF",
    padding: 15,
    margin: 5,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  tittle: {
    color: "#8F00FF",
  },
});

export default Home;
