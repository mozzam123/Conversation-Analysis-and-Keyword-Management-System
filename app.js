const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.json("node.js working");
});

app.listen(9999, () => {
  console.log("Running on port 9999");
});
