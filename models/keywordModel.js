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

const Keywords = mongoose.model("Keywords", keywordSchema);

module.exports = Keywords;
