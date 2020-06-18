import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView } from "react-native";
import { Text, Button, Image } from "react-native-elements";
import { Linking } from "expo";

const Episode = ({ route }) => {
  const { episodePath, name } = route.params;
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    console.log(episodePath.href);
    const res = await fetch(episodePath.href);
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
  
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <Text style={styles.text}>{name}</Text>
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

      <Text style={styles.textSmall}>Name: {data.name}</Text>
      <Text style={styles.textSmall}>Season: {data.season}</Text>
      <Text style={styles.textSmall}>Episode: {data.number}</Text>
      <Text style={styles.textSmall}>Airdate: {data.airdate}</Text>
      <Text style={styles.textSmall}>Summary: </Text>
      <Text style={styles.textSummary}>
        {data.summary ? data.summary.replace(/<[^>]*>?/gm, "") : ""}
      </Text>
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
export default Episode;
