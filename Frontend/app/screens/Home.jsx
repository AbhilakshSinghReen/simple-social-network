import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles, { toastConfig } from "../styles/style";
import Toast from "react-native-toast-message";
import Post from "../components/Post";
import UserAvatar from "react-native-user-avatar";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import { getAllPosts } from "../api/apiServices";
import { UserState } from "../Context/UserProvider";

export default function Home({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  const { isLoadingSavedDetails, user } = UserState();

  const getAllPostsSuccessCallback = (allPosts) => {
    setPosts(allPosts);
    setIsLoadingPosts(false);
  };

  const getAllPostsErrorCallback = (error) => {
    setIsLoadingPosts(false);
  };

  const updatePost = (postId, updatedPost) => {
    const updatedPosts = [];

    posts.forEach((post) => {
      if (post._id == postId) {
        updatedPosts.push(updatedPost);
        return;
      }

      updatedPosts.push(post);
    });
  };

  useEffect(() => {
    setIsLoadingPosts(true);
    getAllPosts({
      success: getAllPostsSuccessCallback,
      error: getAllPostsErrorCallback,
    });
  }, []);

  if (isLoadingSavedDetails || isLoadingPosts) {
    return (
      <View style={{ width: "100%", paddingTop: 50 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!user) {
    navigation.navigate("Profile", { screen: "Login" });
    return null;
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Toast config={toastConfig} />
      <View style={styles.homeHeader}>
        <Text style={styles.homeHeaderText}>Simple Social</Text>
        <View style={styles.postLikesButtonsContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsLoadingPosts(true);
              getAllPosts({
                success: getAllPostsSuccessCallback,
                error: getAllPostsErrorCallback,
              });
            }}
          >
            <FontAwesomeIcon
              size={24}
              name="refresh"
              color="black"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <UserAvatar size={32} name={user?.name} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.postsContainerContentContainerStyle}
        keyboardShouldPersistTaps="handled"
      >
        {posts.map((post, postIndex) => (
          <Post post={post} updatePost={updatePost} key={postIndex} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
