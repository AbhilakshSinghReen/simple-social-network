const jwt = require("jsonwebtoken");

function generateJwt(data) {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
}

module.exports = generateJwt;
