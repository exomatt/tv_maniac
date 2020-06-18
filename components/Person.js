import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView } from "react-native";
import { Text, Button, Image } from "react-native-elements";
import { Linking } from "expo";

const Person = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const res = await fetch(`http://api.tvmaze.com/people/${id}`);
    res
      .json()
      .then((res) => {
        let obj = JSON.parse(JSON.stringify(res));
        console.log(obj)
        setData(obj);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <Text style={styles.text}>{data.name}</Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={data.image && data.image.medium && { uri: data.image.medium }}
          style={{
            width: 250,
            height: 250,
            resizeMode: "contain",
          }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      {data.country ? (
        <Text style={styles.textSmall}>Country: {data.country.name}</Text>
      ) : (
        <Text style={styles.textSmall}></Text>
      )}
      <Text style={styles.textSmall}>Birthday: {data.birthday}</Text>
      {data.deathday ? (
        <Text style={styles.textSmall}>Deathday: {data.deathday}</Text>
      ) : (
        <Text style={styles.textSmall}></Text>
      )}
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
export default Person;
