import React from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView } from "react-native";
import { Text, Button, Image } from "react-native-elements";
import { Linking } from "expo";

const ShowDetails = ({ route, navigation }) => {
  const { show } = route.params;
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <Text style={styles.text}>{show.name}</Text>
      <Text style={styles.textSmall}>{show.premiered}</Text>
      <Text style={styles.textSmall}>Rating: {show.rating.average}</Text>
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

      <Text style={styles.textSmall}>Summary: </Text>
      <Text style={styles.textSummary}>
        {show.summary ? show.summary.replace(/<[^>]*>?/gm, "") : ""}
      </Text>
      <Text style={styles.textSmall}>Status: {show.status}</Text>
      <Text style={styles.textSmall}>Producer: {show.network.name}</Text>
      {show._links.previousepisode ? (
        <Button
          title="Last episode"
          onPress={() => {
            navigation.navigate("Episode", {
              episodePath: show._links.previousepisode,
              name: show.name,
            });
          }}
        />
      ) : (
        ""
      )}
      {show.officialSite ? (
        <Button
          title="Official page"
          onPress={() => {
            Linking.openURL(show.officialSite);
          }}
        />
      ) : (
        ""
      )}
      <Button
        title="Cast"
        onPress={() => {
          navigation.navigate("Cast", {
            id: show.id,
            name: show.name,
          });
        }}
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
    textAlign:"justify"
  },
});
export default ShowDetails;
