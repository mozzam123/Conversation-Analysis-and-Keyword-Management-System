const keywordsModel = require("./../models/keywordModel");
const userModel = require("./../models/userModel");
const {
  detectKeywords,
  analyzeSentiment,
  checkGrammar,
} = require("./../utils");

exports.convoAnalysis = async (req, res) => {
  allResponses = {};
  try {
    const { id, text, component, keyword_detection } = req.body;

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

    if (keyword_detection) {
      const keywords = await keywordsModel.find({ user: exisitngUser._id });
      if (!keywords) {
        return res.status(400).json({ error: "No keywords found!" });
      }

      // Perform keyword detection
      const keyword_detect_response_data = await detectKeywords(
        text,
        keyword_detection,
        id
      );
      allResponses["keyword_detection"] = keyword_detect_response_data;
    }

    if (component) {
      // Check if "sentiment" exists in the component array before performing sentiment analysis
      if (component.includes("sentiment")) {
        const sentiment_score = await analyzeSentiment(text);
        allResponses["sentiment_score"] = sentiment_score;
      }
      // Check if "grammar" exists in the component array before performing grammar check
      if (component.includes("grammar")) {
        const grammar_suggestion = await checkGrammar(text);
        allResponses["grammar_suggestion"] = grammar_suggestion;
      }
    }
    return res.json(allResponses);
  } catch (error) {
    console.log({ error: error });
    return res.json({ error: error });
  }
};
