import {
  View,
  Text,
  Button,
  TextInput,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { launchCamera } from "react-native-image-picker";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

import styles, { toastConfig } from "../styles/style";
import { createPost } from "../api/apiServices";
import { UserState } from "../Context/UserProvider";

export default function CreatePost({ navigation }) {
  const [caption, setCaption] = useState("");
  const [pickedImagePath, setPickedImagePath] = useState("");

  const { token } = UserState();

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  const navigateToHomeScreen = () => {
    // navigation.navigate("Home");
  };

  const onCreatePostSuccess = () => {
    Toast.show({
      type: "success",
      position: "top",
      topOffset: 10,
      text1: "Post created successfully.",
    });

    setCaption("");
    setPickedImagePath("");
    // navigateToHomeScreen();
  };

  const onCreatePostError = () => {};

  const handleCreatePostSubmit = () => {
    if (!caption || !pickedImagePath) {
      return Toast.show({
        type: "warning",
        position: "top",
        topOffset: 50,
        text1: "Please provide a caption and an image.",
      });
    }

    createPost(caption, pickedImagePath, token, {
      success: onCreatePostSuccess,
      error: onCreatePostError,
    });
  };

  return (
    <View style={styles.createPostContainer}>
      <View style={styles.largeInputWithLabel}>
        <Text style={styles.inputLabelText}>Caption</Text>
        <TextInput
          style={styles.largeInput}
          value={caption}
          onChangeText={setCaption}
          placeholder="Enter a caption."
          multiline={true}
        />
      </View>

      <View style={styles.postLikesButtonsContainer}>
        <TouchableOpacity onPress={openCamera}>
          <AntDesignIcon
            size={32}
            color="black"
            name="camera"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={showImagePicker}>
          <MaterialCommunityIconsIcon
            size={32}
            color="black"
            name="view-gallery"
          />
        </TouchableOpacity>
      </View>

      {pickedImagePath !== "" ? (
        <Image
          style={{ width: 200, height: 200, marginBottom: 15 }}
          source={{ uri: pickedImagePath }}
        />
      ) : null}

      <View style={styles.submitButtonContainer}>
        <Button title="Create Post" onPress={handleCreatePostSubmit} />
      </View>
    </View>
  );
}
