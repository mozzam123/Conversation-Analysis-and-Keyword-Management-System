
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
