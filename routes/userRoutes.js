const express = require("express")
const router = express.Router()
const userController = require("./../controllers/userController")


router.post("/create-user",userController.createUser)
router.delete("/delete-user",userController.deleteUser)



module.exports = router;