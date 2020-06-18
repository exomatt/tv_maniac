import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";

export const Register = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [passwordConfirm, onChangePasswordConfirm] = useState("");

  function createAccount() {
    console.log("jestem");
    console.log(email);
    console.log(password);
    if (password.length < 6) {
      Alert.alert("Password should have at least 6 characters!");
      return;
    } else if (password !== passwordConfirm) {
      Alert.alert("Password dont match!");
      return;
    } else {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert("User account created & signed in!");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            Alert.alert("That email address is already in use!");
          }

          if (error.code === "auth/invalid-email") {
            Alert.alert("That email address is invalid!");
          }

          Alert.alert(error.message);
        });
    }
  }

  return (
    <View>
      <Text style={styles.text}>Register</Text>
      <Input
        value={email}
        onChangeText={onChangeEmail}
        placeholder="email"
        leftIcon={<Icon name="envelope" size={24} color="black" />}
      />
      <Input
        value={password}
        onChangeText={onChangePassword}
        placeholder="password"
        leftIcon={<Icon name="lock" size={24} color="black" />}
      />
      <Input
        value={passwordConfirm}
        onChangeText={onChangePasswordConfirm}
        placeholder="password confirm"
        leftIcon={<Icon name="lock" size={24} color="black" />}
      />
      <Button
        icon={<Icon name="user" size={15} color="white" />}
        title=" Register"
        onPress={() => createAccount()}
      />
      <Button
        icon={<Icon name="user" size={15} color="white" />}
        title=" Sign in"
        type="outline"
        onPress={() => navigation.navigate("Login")}
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
    padding: 15,
    margin: 5,
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
});

export default Register;
