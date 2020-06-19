import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";

export const Login = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  function signIn() {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  return (
    <View>
      <Text style={styles.text}>Login</Text>
      <Input
        value={email}
        onChangeText={onChangeEmail}
        placeholder="email"
        leftIcon={<Icon name="envelope" size={24} color="black" />}
      />
      <Input
        value={password}
        secureTextEntry={true}
        onChangeText={onChangePassword}
        placeholder="password"
        leftIcon={<Icon name="lock" size={24} color="black" />}
      />
      <Button
        buttonStyle={styles.btn}
        icon={<Icon name="user" size={15} color="white" />}
        title=" Sign in"
        onPress={() => signIn()}
      />
      <Button
        buttonStyle={styles.btnLogout}
        titleStyle={styles.tittle}
        icon={<Icon name="user" size={15} color="#8F00FF" />}
        title=" Create account"
        type="outline"
        onPress={() => navigation.navigate("Register")}
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
    marginTop: 50,
    fontSize: 40,
    textAlign: "center",
  },
  btnCreate: {
    color: "#8F00FF",
    padding: 15,
    margin: 5,
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  tittle: {
    color: "#8F00FF",
  },
});

export default Login;
