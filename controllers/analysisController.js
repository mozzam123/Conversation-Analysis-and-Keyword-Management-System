const keywordsModel = require("./../models/keywordModel");
const userModel = require("./../models/userModel");
const { detectKeywords , analyzeSentiment} = require("./../utils");

exports.convoAnalysis = async (req, res) => {
  allResponses = {}
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
    const keywords = await keywordsModel.find({ user: exisitngUser._id });
    if (!keywords) {
      return res.status(400).json({ error: "No keywords found!" });
    }
    const keyword_detect_response_data = await detectKeywords(text, keyword_detection, id);
    const sentiment_score =  analyzeSentiment(text)
  
    allResponses["keyword_detection"] = keyword_detect_response_data;
    allResponses["sentiment_score"] = sentiment_score;


    return res.json( allResponses );
  } catch (error) {
    console.log({ error: error });
    return res.json({ error: error });
  }
};
