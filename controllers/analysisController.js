const keywordsModel = require("./../models/keywordModel");
const userModel = require("./../models/userModel");

exports.convoAnalysis = async (req, res) => {
  try {
    const { id, text, keyword_detection } = req.body;
    if (!id) {
      return res.status(404).json({ error: "id field is required" });
    }

    if (!text) {
      return res.status(404).json({ error: "text field is required" });
    }

    const exisitngUser = await userModel.findById(id);

    if (!exisitngUser) {
      return res.status(404).json({ error: "User not found!" });
    }
    return res.json({msg: 'sfdj'})
  } catch (error) {
    console.log({ error: error });
    return res.json({ error: error });
  }
};
