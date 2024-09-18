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

// Get all keywords
exports.getAllKeywords = async (req, res) => {
  try {
    const id = req.params.id;
    const existingKeywords = await Keywords.find({ user: id });
    if (!existingKeywords) {
      return res.json({ error: "No keywords found" }).status(404);
    }
    return res.json({ result: existingKeywords });
  } catch (error) {
    console.log({ error: error });
    return res.json({ error: error });
  }
};

// Delete Keyword
exports.deleteKeyword = async (req, res) => {
  try {
    const { id, keyword_name } = req.body;
    if (!id) {
      return res.json({ error: "id field is required" }).status(400);
    }
    if (!keyword_name) {
      return res.json({ error: "keyword_name field is required" }).status(400);
    }

    const exisitngUser = await User.findById(id);
    console.log(exisitngUser);
    if (!exisitngUser) {
      return res.json({ error: "User not found" }).status(404);
    }
    const existingKeyword = await Keywords.findOne({
      user: exisitngUser._id,
      name: keyword_name,
    });
    if (!existingKeyword) {
      return res.json({ error: "keywod name not found" }).status(404);
    }
    await Keywords.findByIdAndDelete(existingKeyword._id);

    return res.json({ message: "keyword successfully deleted" }).status(200);
  } catch (error) {
    console.log({ error: error });
    return res.json({ error: error });
  }
};

// Update Keyword
exports.updateKeyword = async (req, res) => {
  try {
    const { id, keywords } = req.body;
    if (!id) {
      return res.json({ error: "id field is required" }).status(400);
    }

    if (!keywords) {
      return res.json({ error: "keywords field is required" }).status(400);
    }
    const existingKeyword = await Keywords.findById(id);
    if (!existingKeyword) {
      return res.json({ error: "keyword not found" }).status(404);
    }
    // Use the proper update syntax with an object
    await Keywords.findByIdAndUpdate(
      id,
      { keywords: keywords },
      {
        new: true, // Return the updated document
        runValidators: true, // Run validators
      }
    );

    return res.json({ message: "keyword updated successfully" });
  } catch (error) {
    console.log({ error: error });
    return res.json({ error: error });
  }
};
