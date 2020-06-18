import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { Text, Button, Image, ListItem } from "react-native-elements";
import { Linking } from "expo";

const Cast = ({ route, navigation }) => {
  const { id, name } = route.params;
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const res = await fetch(`http://api.tvmaze.com/shows/${id}/cast`);
    res
      .json()
      .then((res) => {
        let obj = JSON.parse(JSON.stringify(res));
        console.log(obj);
        setData(obj);
      })
      .catch((err) => {
        // setErrors(true);
        // setIsLoading(false);
        console.log("Error", err);
      });
  }

  function renderItem(item) {
    if (item) {
      return (
        <ListItem
          title={item.person.name}
          subtitle={item.character.name}
          leftAvatar={{
            source: item.person &&
              item.person.image &&
              item.person.image.medium && { uri: item.person.image.medium },
          }}
          bottomDivider
          chevron
          onPress={() => {
            navigation.navigate("Person", {
              id: item.person.id,
            });
          }}
        />
      );
    }
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <Text style={styles.text}>{name}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderItem(item.item)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3dcdc",
  },
  text: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 0,
    fontSize: 40,
    textAlign: "center",
  },
  textSmall: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 0,
    fontSize: 30,
    textAlign: "center",
  },
  textSummary: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 0,
    fontSize: 20,
    textAlign: "center",
    textAlign: "justify",
  },
});
export default Cast;
