const express = require("express");

const { requireAuth } = require("../middlewares/authMiddleware");
const { uploadMiddleware } = require("../middlewares/uploadMiddleware");
const {
  createPost,
  getAllPosts,
  likePost,
  unlikePost,
} = require("../controllers/postControllers");

const router = express.Router();

router.post(
  "/create",
  requireAuth,
  uploadMiddleware.single("image"),
  createPost
);
router.get("/all", getAllPosts);
router.put("/like", requireAuth, likePost);
router.put("/unlike", requireAuth, unlikePost);

// router.post("/sign-up", signUpUser);requireAuth
// router.post("/sign-in", signInUser);

module.exports = router;
