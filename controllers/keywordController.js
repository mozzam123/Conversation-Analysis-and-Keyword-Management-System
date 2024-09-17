const Keywords = require("./../models/keywordModel");
const User = require("./../models/userModel");

// Add keyword
exports.addKeyword = async (req, res) => {
  try {
    const { id, name, keywords } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.json({ message: "User does not found" });
    }
    const existingKeyword = await Keywords.findOne({
      user: user._id,
      name: name,
    });
    if (existingKeyword) {
      return res.json({ message: "keyword already exists with this name" });
    }
    await new Keywords({
      user: user._id,
      name: name,
      keywords: keywords,
    }).save();

    return res.json({ msg: "keywords added successfully" });
  } catch (error) {
    console.log({ error: error });
    return res.json({ error: error });
  }
};

// Get singlekeywords
exports.getKeyword = async (req, res) => {
  try {
    const { id, keyword_name } = req.query;
    const exisitngUser = await User.findById(id);
    if (!exisitngUser) {
      return res.json({ error: "User not found" }).status(404);
    }
    const existingKeyword = await Keywords.findOne({
      user: exisitngUser._id,
      name: keyword_name,
    });
    if (!existingKeyword) {
      return res
        .json({ error: "keyword not found with this name" })
        .status(404);
    }
    return res.json({ message: existingKeyword }).status(200);
  } catch (error) {
    console.log({ error: error });
    return res.json({ error: error });
  }
};
