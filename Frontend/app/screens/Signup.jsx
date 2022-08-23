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
import { registerUser } from "../api/apiServices";
import { storeString, storeData, getData } from "../api/asyncStorage";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, setUser, setToken } = UserState();

  const navigateToUserProfileScreen = () => {
    navigation.navigate("UserProfile");
  };

  const navigateToLoginScreen = () => {
    navigation.navigate("Login");
  };

  const navigateToHomeScreen = () => {
    navigation.navigate("Home");
  };

  const resetInputs = () => {
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
  };

  const onRegisterUserSuccess = async ({ user, token }) => {
    setUser(user);
    setToken(token);

    await storeData("user", user);
    await storeString("token", token);

    Toast.show({
      type: "success",
      position: "top",
      topOffset: 50,
      text1: "Registration successful.",
    });

    resetInputs();
    navigateToHomeScreen();
  };

  const onRegisterUserError = () => {
    Toast.show({
      type: "warning",
      position: "top",
      topOffset: 50,
      text1: "Something went wrong.",
    });
  };

  const handleSignupSubmit = () => {
    if (!email || !name || !password || !confirmPassword) {
      return Toast.show({
        type: "warning",
        position: "top",
        topOffset: 50,
        text1: "All fields are required.",
      });
    }

    if (password !== confirmPassword) {
      return Toast.show({
        type: "warning",
        position: "top",
        topOffset: 50,
        text1: "Passwords do not match.",
      });
    }

    const newUserData = {
      email: email,
      name: name,
      password: password,
    };

    registerUser(newUserData, {
      success: onRegisterUserSuccess,
      error: onRegisterUserError,
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
            <Text style={styles.inputLabelText}>Name</Text>
            <TextInput
              style={styles.smallInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name."
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

          <View style={styles.inputWithLabel}>
            <Text style={styles.inputLabelText}>Confirm Password</Text>
            <TextInput
              style={styles.smallInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Enter your password again."
              secureTextEntry={true}
            />
          </View>

          <View style={styles.submitButtonContainer}>
            <Button title="Sign Up" onPress={handleSignupSubmit} />
          </View>

          <View style={styles.loginRegisterTransferView}>
            <Text style={styles.smallLabel}>Already have an an account?</Text>
            <TouchableOpacity onPress={navigateToLoginScreen}>
              <Text style={styles.smallLabelBold}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
