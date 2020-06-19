import React, { useContext, useEffect, useState } from "react";
import { SearchBar, ListItem } from "react-native-elements";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { Linking } from "expo";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../App";
import * as firebase from "firebase";
import "firebase/firestore";
import moment from "moment";

const Tonight = ({ route, navigation }) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [data]);

  async function fetchData() {
    const res = await fetch(
      `http://api.tvmaze.com/schedule?country=US&date=${moment().format(
        "YYYY-MM-DD"
      )}`
    );
    res
      .json()
      .then((res) => {
        let obj = JSON.parse(JSON.stringify(res));
        // console.log(obj);
        setData(obj);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }
  function renderItem(item) {
    console.log(item);
    return (
      <ListItem
        title={item.name}
        //   subtitle={item.rating.average}
        leftAvatar={{
          source: item &&
            item.image &&
            item.image.medium && { uri: item.image.medium },
          // title: item.name[0],
        }}
        bottomDivider
        chevron
        onPress={() => {
          navigation.navigate("Show Details", {
            show: item,
          });
        }}
      />
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderItem(item.item.show)}
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
export default Tonight;
