const keywordsModel = require("./models/keywordModel");
const userModel = require("./models/userModel");
const Sentiment = require("sentiment");
const axios = require("axios");
const qs = require("qs");

// Utility function to count the word occurences
exports.countWords = (text) => {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/);
  const wordCounts = {};
  words.forEach((word) => {
    if (word) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  });
  return wordCounts;
};

// To detect keywords from text
exports.detectKeywords = async (text, keywordList, id) => {
  // Create a dictionary to hold results for each keyword category
  const responseData = {};
  const allKeywords = [];
  try {
    // Fetch all keywords for the given customer_id
    const keywordObjs = await keywordsModel.find({
      user: id,
      name: { $in: keywordList },
    });

    // Early exit if no keywordObjs are found
    if (!keywordObjs.length) {
      responseData.keyword_detection["Present"] = null;
      return responseData;
    }

    for (let i = 0; i < keywordObjs.length; i++) {
      const keywordObj = keywordObjs[i]; // Assuming only one object is returned

      // Loop through each keyword string in keywordObj.keywords array
      keywordObj.keywords.forEach((keywordString) => {
        // Split the keywords string into an array of individual words
        const keywords = keywordString.split(",").map((word) => word.trim());

        // Concatenate these keywords to allKeywords array
        allKeywords.push(...keywords);
      });
    }

    // Split the text into words for easier comparison
    const textWords = new Set(text.split(/\s+/));

    // Find matching keywords in the text
    const foundKeywords = allKeywords.filter((word) => textWords.has(word));

    // Add found keywords to the response data
    if (foundKeywords.length > 0) {
      responseData["Present"] = foundKeywords;
    } else {
      responseData["Present"] = null;
    }

    return responseData;
  } catch (error) {
    console.error("Error fetching keywords:", error);
    throw new Error("Failed to detect keywords");
  }
};

exports.analyzeSentiment = async (text) => {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);

  let overallSentiment;
  if (result.comparative > 0) {
    overallSentiment = "Positive";
  } else if (result.comparative < 0) {
    overallSentiment = "Negative";
  } else {
    overallSentiment = "Neutral";
  }

  return {
    overallSentiment,
  };
};



exports.checkGrammar = async (text) => {
  try {
    const response = await axios.post(
      "https://api.languagetool.org/v2/check",
      qs.stringify({
        text: text,
        language: "en",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log('Api response: ', response.data.matches[0].message);

    return response.data.matches[0].message;
  } catch (error) {
    console.error("Error:", error.response.data);
  }
};

// const sentence =
//   "The area is good to live  but the shops tubelight are not nearby tb and there is one mart";
// checkGrammar(sentence).then((matches) => {
//   console.log("Grammar Suggestions:", matches[0].message);
// });
