import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import Toast from "react-native-toast-message";

import styles, { toastConfig } from "../styles/style";
import { UserState } from "../Context/UserProvider";
import { loginUser } from "../api/apiServices";
import { storeString, storeData } from "../api/asyncStorage";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser, setToken } = UserState();

  const navigateToUserProfileScreen = () => {
    navigation.navigate("UserProfile");
  };

  const navigateToSignUpScreen = () => {
    navigation.navigate("Signup");
  };

  const navigateToHomeScreen = () => {
    navigation.navigate("Home");
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  const onLoginUserSuccess = async ({ user, token }) => {
    setUser(user);
    setToken(token);

    await storeData("user", user);
    await storeString("token", token);

    Toast.show({
      type: "success",
      position: "top",
      topOffset: 50,
      text1: "Login successful.",
    });

    resetInputs();
    navigateToHomeScreen();
  };

  const onLoginUserError = () => {
    Toast.show({
      type: "warning",
      position: "top",
      topOffset: 50,
      text1: "Something went wrong.",
    });
  };

  const handleLoginSubmit = () => {
    if (!email || !password) {
      return Toast.show({
        type: "warning",
        position: "top",
        topOffset: 50,
        text1: "All fields are required.",
      });
    }

    const userCredentials = {
      email: email,
      password: password,
    };

    loginUser(userCredentials, {
      success: onLoginUserSuccess,
      error: onLoginUserError,
    });
  };

  if (user) {
    navigateToUserProfileScreen();
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Toast config={toastConfig} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.inputsContainer}>
          <View style={styles.inputWithLabel}>
            <Text style={styles.inputLabelText}>Email</Text>
            <TextInput
              style={styles.smallInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email."
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputWithLabel}>
            <Text style={styles.inputLabelText}>Password</Text>
            <TextInput
              style={styles.smallInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password."
              secureTextEntry={true}
            />
          </View>

          <View style={styles.submitButtonContainer}>
            <Button title="Login" onPress={handleLoginSubmit} />
          </View>

          <View style={styles.loginRegisterTransferView}>
            <Text style={styles.smallLabel}>Don't have an an account?</Text>
            <TouchableOpacity onPress={navigateToSignUpScreen}>
              <Text style={styles.smallLabelBold}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
