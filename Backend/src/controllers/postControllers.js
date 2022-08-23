const asyncHandler = require("express-async-handler");

const postModel = require("../db/models/PostModel");
const { deleteFile } = require("../utility/fileHandling");

const createPost = asyncHandler(async (req, res) => {
  const creator = req.user._id;
  const { caption } = req.body;

  if (caption === undefined) {
    deleteFile(req.file.path);
    return res.sendStatus(400);
  }

  imageUrl = "/" + req.file.path.replace(/\/\//g, "/").replace(/\\/g, "/");

  const newPost = await postModel.create({
    creator: creator,
    caption: caption,
    imageUrl: imageUrl,
  });

  if (!newPost) {
    deleteFile(req.file.path);
    return res.sendStatus(400);
  }

  return res.sendStatus(201);
});

const getAllPosts = asyncHandler(async (req, res) => {
  const allPosts = await postModel
    .find()
    .populate("creator", "-hashedPassword")
    .sort("-createdAt");

  return res.status(200).json({ posts: allPosts });
});

const likePost = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;
  const { postId } = req.body;

  if (postId === undefined) {
    return res.status(400).json({
      error: "Post Id not provided.",
      message: "Application error.",
    });
  }

  const postExists = await postModel.findOne({ _id: postId });

  if (!postExists) {
    return res.status(400).json({
      error: "Invalid Post Id.",
      message: "Application error.",
    });
  }

  const updatedPost = await postModel
    .findByIdAndUpdate(
      postId,
      {
        $addToSet: { likes: loggedInUserId },
      },
      {
        new: true,
      }
    )
    .populate("creator", "-hashedPassword");

  if (!updatedPost) {
    return res.status(400).json({
      error: "Server error.",
      message: "Server error.",
    });
  }

  return res.status(200).json({ post: updatedPost });
});

const unlikePost = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;
  const { postId } = req.body;

  if (postId === undefined) {
    return res.status(400).json({ error: "Post Id not provided." });
  }

  const postExists = await postModel.findOne({ _id: postId });

  if (!postExists) {
    return res.status(400).json({
      error: "Invalid Post Id.",
    });
  }

  const updatedPost = await postModel
    .findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loggedInUserId },
      },
      {
        new: true,
      }
    )
    .populate("creator", "-hashedPassword");

  if (!updatedPost) {
    return res.sendStatus(500);
  }

  return res.status(200).json({ post: updatedPost });
});

module.exports = { createPost, getAllPosts, likePost, unlikePost };
