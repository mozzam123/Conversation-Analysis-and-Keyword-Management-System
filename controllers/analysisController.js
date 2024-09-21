const keywordsModel = require("./../models/keywordModel");
const userModel = require("./../models/userModel");
const {detectKeywords} = require("./../utils")

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
    const keywords = await keywordsModel.find({user: exisitngUser._id})
    if (!keywords){
      return res.status(400).json({error: "No keywords found!"})
    }
    response_data = detectKeywords(text,keyword_detection,id)
    
    
    return res.json({ results: response_data });
  } catch (error) {
    console.log({ error: error });
    return res.json({ error: error });
  }
};
