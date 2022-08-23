const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const userModel = require("../db/models/UserModel");

const requireAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const { userId } = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await userModel.findById(userId).select("-hashedPassword");

      next();
    } catch (error) {
      res.status(401);
    //   throw new Error("Bad authorization token.");
    }
  }

  if (!token) {
    res.status(401);
    // throw new Error("No authorization token.");
  }
});

module.exports = { requireAuth };
