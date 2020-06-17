import React from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView } from "react-native";
import { Text } from "react-native-elements";
import { Image } from "react-native-elements";

const ShowDetails = ({ route }) => {
  const { show } = route.params;
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <Text style={styles.text}>{show.name}</Text>
      <Text style={styles.textSmall}>{show.premiered}</Text>
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

      <Text style={styles.textSummary}>{show.summary.replace(/<[^>]*>?/gm, '')}</Text>
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
