const express = require("express");
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const keywordRoutes = require("./routes/keywordRoutes")
const analysisRoutes = require("./routes/analysisRoutes")
const app = express();


// Middleware
app.use(express.json());

// Routes
app.use('/api/user', userRoutes)
app.use('/api/keyword', keywordRoutes)
app.use("/api/analysis", analysisRoutes);


mongoose
  .connect("mongodb://127.0.0.1:27017/LIF")
  .then(() => {
    console.log("Database connected for LIF");
  })
  .catch((err) => {
    console.log(`Database error: ${err}`);
  });

app.listen(8888, () => {
  console.log("Running on port 8888");
});
