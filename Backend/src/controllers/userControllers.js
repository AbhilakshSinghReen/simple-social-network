const asyncHandler = require("express-async-handler");

const userModel = require("../db/models/UserModel");
const generateJwt = require("../utility/generateJwt");
const hashPassword = require("../utility/hashPassword");

const signUpUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await userModel.findOne({ email: email });
  if (userExists) {
    res.status(400).json({
      error: "Email already taken.",
    });
    return;
  }

  const newUser = await userModel.create({
    name: name,
    email: email,
    hashedPassword: await hashPassword(password),
  });

  if (!newUser) {
    res.status(400).json({
      error: "Failed to create user.",
    });
    return;
  }

  res.status(201).json({
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePictureUrl: newUser.profilePictureUrl,
    },
    token: generateJwt({ userId: newUser._id }),
  });
});

const signInUser = asyncHandler(async (req, res) => {
  console.log("new req")
  const { email, password } = req.body;

  const userExists = await userModel.findOne({ email: email });
  if (!userExists || !(await userExists.checkPassword(password))) {
    res.status(400).json({
      error: "Invalid credentials.",
    });
    return;
  }

  res.status(200).json({
    user: {
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      profilePictureUrl: userExists.profilePictureUrl,
    },
    token: generateJwt({ userId: userExists._id }),
  });
});

module.exports = { signUpUser, signInUser };
