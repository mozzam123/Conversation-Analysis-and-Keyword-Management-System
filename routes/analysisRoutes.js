const express = require("express");
const router = express.Router();
const analysisController = require("./../controllers/analysisController")

router.post('/conversation', analysisController.convoAnalysis)
module.exports = router;