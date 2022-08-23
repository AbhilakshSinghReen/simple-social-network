import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import UserAvatar from "react-native-user-avatar";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";

import styles, { toastConfig } from "../styles/style";
import { UserState } from "../Context/UserProvider";
import { storeString, storeData } from "../api/asyncStorage";
import CreatePost from "../components/CreatePost";

export default function UserProfile({ navigation }) {
  const { user, setUser, setToken } = UserState();

  const navigateToLoginScreen = () => {
    navigation.navigate("Login");
  };

  const handleLogoutSubmit = async () => {
    setUser(null);
    setToken("");

    await storeData("user", null);
    await storeString("token", "");

    Toast.show({
      type: "success",
      position: "top",
      topOffset: 50,
      text1: "Logout successful.",
    });

    navigateToLoginScreen();
  };

  const handleCreatePost = () => {};

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Toast config={toastConfig} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.detailsContainer}>
          <View style={styles.iconRightContainer}>
            <TouchableOpacity onPress={handleLogoutSubmit}>
              <MaterialIconsIcon size={24} color="black" name="logout" />
            </TouchableOpacity>
          </View>

          <UserAvatar size={100} name={user?.name} />

          <Text style={styles.displayLabel}>{user?.name}</Text>

          <Text style={styles.displayLabelSmall}>{user?.email}</Text>

          <CreatePost />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
