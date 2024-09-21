const keywordsModel = require("./models/keywordModel");
const userModel = require("./models/userModel");

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
  const responseData = { keyword_detection: {} };
  const allKeywords = []
  try {
    // Fetch all keywords for the given customer_id
    const keywordObjs = await keywordsModel.find({
      user: id,
      name: { $in: keywordList },
    });

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
      responseData.keyword_detection["Present"] = foundKeywords;
    } else {
      responseData.keyword_detection["Present"] = null;
    }
    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error("Error fetching keywords:", error);
    throw new Error("Failed to detect keywords");
  }
};
