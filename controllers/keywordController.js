const Keywords = require('./../models/keywordModel')
const User = require("./../models/userModel")


// Add keyword
exports.addKeyword = async (req, res) =>{
    const {id, name, keywords} = req.body
    const user = await User.findById(id)
    if (!user){
        return res.json({"message": "User does not found"})
    }
    const existingKeyword = await Keywords.findOne({user: user._id, name: name})
    if (existingKeyword){
        return res.json({"message": "keyword already exists with this name"})
    }
    await new Keywords({
        user: user._id,
        name: name,
        keywords:keywords 

    }).save()

    return res.json({msg: "keywords added successfully"})
}


// Get single keyword
