import React, { useState, useEffect } from "react";
import { SearchBar, ListItem } from "react-native-elements";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";

export const SearchShow = ({ navigation }) => {
  const [show, onChangeShow] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData();
  }, [show]);

  async function fetchData() {
    const res = await fetch(`http://api.tvmaze.com/search/shows?q=${show}`);
    res
      .json()
      .then((res) => {
        let obj = JSON.parse(JSON.stringify(res));
        // console.log(obj);
        setData(obj);
      })
      .catch((err) => {
        // setErrors(true);
        // setIsLoading(false);
        console.log("Error", err);
      });
  }



  function renderItem(item) {
    console.log("dupa");
    if (item) {
      return (
        <ListItem
          title={item.show.name}
          subtitle={item.show.rating.average}
          leftAvatar={{
            source: item.show &&
              item.show.image &&
              item.show.image.medium && { uri: item.show.image.medium },
            // title: item.name[0],
          }}
          bottomDivider
          chevron
          onPress={() => {
            navigation.navigate("Show Details", {
              show: item.show,
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
        <SearchBar
          placeholder="Search Show..."
          onChangeText={onChangeShow}
          value={show}
          lightTheme={true}
          platform="android"
          autoCorrect={false}
          style={styles.search}
        />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={(item) => renderItem(item.item)}
        />
      </ScrollView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 15,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "lightgrey",
  },
  btn: {
    padding: 15,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
    marginTop:30
    // backgroundColor: "#e3dcdc",
  },
  search: {
    padding: 10,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
  },
});

export default SearchShow;
