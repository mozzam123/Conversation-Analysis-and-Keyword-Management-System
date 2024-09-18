const express = require("express")
const router = express.Router()
const keywordController = require("./../controllers/keywordController")

router.post("/add-keyword", keywordController.addKeyword)
router.get("/get-keyword", keywordController.getKeyword)
router.get("/get-keyword/:id", keywordController.getAllKeywords);
router.delete("/delete-keyword", keywordController.deleteKeyword);
router.put("/update-keyword", keywordController.updateKeyword);


module.exports = router;