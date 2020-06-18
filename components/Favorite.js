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

const Favorite = ({ route, navigation }) => {
  const [data, setData] = useState();
  const [table, setTable] = useState();

  const user = useContext(AuthContext);
  const db = firebase.firestore();
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [data]);

  useEffect(() => {}, [table]);

  async function fetchShows() {
    let shows = [];
    for (var i = 0; i < table.length; i++) {
      const res = await fetch(`http://api.tvmaze.com/shows/${table[i].id}`);
      res
        .json()
        .then((res) => {
          let obj = JSON.parse(JSON.stringify(res));
          shows.push(obj);
        })
        .catch((err) => {
          // setErrors(true);
          // setIsLoading(false);
          console.log("Error", err);
        });
    }
    setData(shows);
  }

  async function fetchData() {
    let table = [];
    db.collection(`users/${user.uid}/favorite`)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          table.push({
            docId: doc.id,
            id: doc.data().id,
            name: doc.data().name,
          });
        });
        setTable(table);
      })
      .catch((err) => {
        console.log("Error getting documents", err);
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
export default Favorite;
