import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export const Home = ({ navigation }) => {
  const [season, onChangeSeason] = useState("");
  const [round, onChangeRound] = useState("");

  return (
    <View>
      <Button
        title="Press me"
        onPress={() =>
          navigation.navigate("Search Show")
        }
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
