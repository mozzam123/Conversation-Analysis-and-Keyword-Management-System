const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userid: {
      type: Number,
      required: [true, "userid field is required"],
      unique: true,
      maxlength: 15,
    },
    username: {
      type: String,
      required: [true, "username field is required"],
      maxlength: 15,
    },

    password: {
      type: String,
      required: [true, "password field is required"],
      maxlength: 10,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
