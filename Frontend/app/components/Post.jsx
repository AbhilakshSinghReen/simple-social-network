import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/style";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import UserAvatar from "react-native-user-avatar";

import { likePost, unlikePost } from "../api/apiServices";
import { UserState } from "../Context/UserProvider";

export default function Post({ post, updatePost }) {
  const [imageWidth, setImageWidth] = useState(10);
  const [imageHeight, setImageHeight] = useState(10);

  const [isLiked, setIsLiked] = useState(false);

  const { user, token } = UserState();

  Image.getSize(post.imageUrl, (width, height) => {
    setImageWidth(width);
    setImageHeight(height);
  });

  const onLikePostSuccess = (updatedPost) => {
    setIsLiked(true);
    updatePost(post._id, updatedPost);
    // post.likes = updatedPost.likes;
  };

  const onLikePostError = () => {};

  const onUnlikePostSuccess = (updatedPost) => {
    setIsLiked(false);
    updatePost(post._id, updatedPost);
    // post.likes = updatedPost.likes;
  };

  const onUnlikePostError = () => {};

  const handleLikePost = () => {
    if (!isLiked) {
      likePost(post._id, token, {
        success: onLikePostSuccess,
        error: onLikePostError,
      });
    } else {
      unlikePost(post._id, token, {
        success: onUnlikePostSuccess,
        error: onUnlikePostError,
      });
    }
  };

  useEffect(() => {
    if (post.likes.includes(user._id)) {
      setIsLiked(true);
    }
  }, [post]);

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <UserAvatar size={32} name={post.creator.name} />
        <Text style={styles.postCreatorLabel}>{post.creator.name}</Text>
      </View>
      <Text style={styles.postCaption}>{post.caption}</Text>
      <Image
        style={{
          width: "100%",
          height: undefined,
          aspectRatio: imageWidth / imageHeight,
        }}
        source={{ uri: post.imageUrl }}
      />

      <View style={styles.postLikesContainer}>
        <View style={styles.postLikesTextContainer}>
          {/* <Text style={styles.postLikesText}>{post.likes.length} Likes</Text> */}
        </View>

        <View style={styles.postLikesButtonsContainer}>
          <TouchableOpacity onPress={handleLikePost}>
            {isLiked ? (
              <AntDesignIcon size={24} color="black" name="like1" />
            ) : (
              <AntDesignIcon size={24} color="black" name="like2" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
