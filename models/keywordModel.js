const mongoose = require("mongoose");

const keywordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "user is required"],
  },
  name: {
    type: String,
    required: [true, "name field is required"],
    maxlength: 15,
  },

  keywords: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, "keywords field is required"],
  },
});

keywordSchema.pre("remove", async function (next) {
  // Code to handle cascade-like deletion for related keywords
  // For example, if you're deleting a User, you can delete related keywords here.
  await Keywords.deleteMany({ user: this._id });
  next();
});

const Keywords = mongoose.model("Keywords", keywordSchema);

module.exports = Keywords;
