import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Text, Button, Image } from "react-native-elements";
import { Linking } from "expo";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../App";
import * as firebase from "firebase";
import "firebase/firestore";

const ShowDetails = ({ route, navigation }) => {
  const [data, setData] = useState("");

  const { show } = route.params;
  const user = useContext(AuthContext);
  const db = firebase.firestore();
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [data]);

  async function fetchData() {
    let table = [];
    db.collection(`users/${user.uid}/favorite`)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          table.push({
            docId: doc.id,
            id: doc.data().id,
            name: doc.data().name,
          });
        });
        setData(table);
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
  }

  function addToFavorite() {
    db.collection(`users/${user.uid}/favorite`)
      .add({
        id: show.id,
        name: show.name,
      })
      .then((data) => {
        ToastAndroid.show("Add to favorite!", ToastAndroid.SHORT);
        fetchData();
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function removeFromFavorite() {
    let temp = data.find((obj) => {
      return obj.id === show.id;
    });
    db.collection(`users/${user.uid}/favorite`)
      .doc(`${temp.docId}`)
      .delete()
      .then((data) => {
        // console.log("data", data);
        ToastAndroid.show("Remove from favorite!", ToastAndroid.SHORT);
        fetchData();
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function renderFavoriteButton() {
    if (data) {
      if (
        data.find((obj) => {
          return obj.id === show.id;
        })
      ) {
        return (
          <Button
            buttonStyle={styles.btn}
            icon={<Icon name="heart-o" size={15} color="white" />}
            title=" Remove from favorite"
            buttonStyle={styles.btn}
            onPress={() => removeFromFavorite()}
          />
        );
      } else {
        return (
          <Button
            buttonStyle={styles.btn}
            icon={<Icon name="heart" size={15} color="white" />}
            title=" Add to favorite"
            onPress={() => addToFavorite()}
          />
        );
      }
    }
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <Text style={styles.text}>{show.name}</Text>
      <Text style={styles.textSmall}>{show.premiered}</Text>
      {show.rating ? (
        <Text style={styles.textSmall}>Rating: {show.rating.average}</Text>
      ) : (
        <></>
      )}

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={show.image && show.image.medium && { uri: show.image.medium }}
          style={{
            width: 250,
            height: 250,
            resizeMode: "contain",
          }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>

      {show.summary ? <Text style={styles.textSmall}>Summary: </Text> : <></>}
      <Text style={styles.textSummary}>
        {show.summary ? show.summary.replace(/<[^>]*>?/gm, "") : ""}
      </Text>
      <Text style={styles.textSmall}>Status: {show.status}</Text>
      {show.network ? (
        <Text style={styles.textSmall}>Producer: {show.network.name}</Text>
      ) : (
        <></>
      )}
      {show._links.previousepisode ? (
        <Button
          buttonStyle={styles.btn}
          title="Last episode"
          onPress={() => {
            navigation.navigate("Episode", {
              episodePath: show._links.previousepisode,
              name: show.name,
            });
          }}
        />
      ) : (
        <></>
      )}
      {show.officialSite ? (
        <Button
          buttonStyle={styles.btn}
          title="Official page"
          onPress={() => {
            Linking.openURL(show.officialSite);
          }}
        />
      ) : (
        <></>
      )}
      <Button
        buttonStyle={styles.btn}
        title="Cast"
        onPress={() => {
          navigation.navigate("Cast", {
            id: show.id,
            name: show.name,
          });
        }}
      />
      {renderFavoriteButton()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3dcdc",
  },
  btn: {
    backgroundColor: "#8F00FF",
    padding: 15,
    margin: 5,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
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
export default ShowDetails;
