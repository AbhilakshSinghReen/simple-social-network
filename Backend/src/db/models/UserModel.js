const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userModelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userModelSchema.methods.checkPassword = async function (password) {
  const o = await bcrypt.compare(password, this.hashedPassword);
  console.log("check = ", o);
  return o;
};

const userModel = mongoose.model("User", userModelSchema);

module.exports = userModel;
