const express = require("express")
const router = express.Router()
const keywordController = require("./../controllers/keywordController")

router.post("/add-keyword", keywordController.addKeyword)
router.get("/keyword", keywordController.getKeyword)


module.exports = router;