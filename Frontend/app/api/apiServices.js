import axios from "axios";

import { backendBaseUrl } from "./backendConfig";

const axiosInstance = axios.create({
  baseURL: `${backendBaseUrl}/api`,
  headers: {
    Accept: "application/json",
  },
});

export async function registerUser(newUserData, callbacks) {
  try {
    const { data } = await axiosInstance.post("/user/sign-up", newUserData);
    callbacks.success(data);
  } catch (error) {
    console.log(error);
    callbacks.error(error);
  }
}

export async function loginUser(userCredentials, callbacks) {
  try {
    const { data } = await axiosInstance.post("/user/sign-in", userCredentials);
    callbacks.success(data);
  } catch (error) {
    console.log("Login error");
    console.log(error);
    callbacks.error(error);
  }
}

export async function createPost(caption, imageLocalUri, userToken, callbacks) {
  const localUri = imageLocalUri;
  let filename = localUri.split("/").pop();

  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  // Upload the image using the fetch and FormData APIs
  let formData = new FormData();
  // Assume "photo" is the name of the form field the server expects
  formData.append("caption", caption);
  formData.append("image", { uri: localUri, name: filename, type });

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "content-type": "multipart/form-data",
      },
    };
    const { data } = await axiosInstance.post("/posts/create", formData, config);
    callbacks.success();
  } catch (error) {
    console.log("Create post error");
    console.log(error);
    callbacks.error(error);
  }
}

const updateImageUrls = (posts) => {
  return posts.map((post) => {
    post.imageUrl = backendBaseUrl + post.imageUrl;
    return post;
  });
};

export async function getAllPosts(callbacks) {
  try {
    const { data } = await axiosInstance.get("/posts/all");
    posts = updateImageUrls(data.posts);
    callbacks.success(posts);
  } catch (error) {
    console.log(error);
    callbacks.error(error);
  }
}

export async function likePost(postId, userToken, callbacks) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const postDetails = {
      postId: postId,
    };
    const { data } = await axiosInstance.put(
      "/posts/like",
      postDetails,
      config
    );
    callbacks.success(data.post);
  } catch (error) {
    console.log("Like post error");
    console.log(error);
    callbacks.error(error);
  }
}

export async function unlikePost(postId, userToken, callbacks) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const postDetails = {
      postId: postId,
    };
    const { data } = await axiosInstance.put(
      "/posts/unlike",
      postDetails,
      config
    );
    callbacks.success(data.post);
  } catch (error) {
    console.log("Unlike post error");
    console.log(error);
    callbacks.error(error);
  }
}
