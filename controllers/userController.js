const User = require("./../models/userModel");

exports.createUser = async (req, res) => {
  const { userid, username, password } = req.body;
  const existingUser = await User.findOne({
    $or: [
      {username: username},
      {userid: userid}
    ]
  });

  if (existingUser) {
    return res.status(400).json({ error: "username or userid already exist" });
  }

  if (!userid) {
    return res.status(404).json({ error: "userid field is not provided" });
  }
  if (!username) {
    return res.status(404).json({ error: "username field is not provided" });
  }

  if (!password) {
    return res.status(404).json({ error: "password field is not provided" });
  }

  try {
    await new User({
      userid: userid,
      username: username,
      password: password,
    }).save();
  } catch (error) {
    return res.json({ error: error.message });
  }

  console.log(`User saved with username: ${username}`);

  res.status(200).json({ msg: "User Created" });
};




// Delete User
exports.deleteUser = async (req, res) => {
  try {
    console.log(req.query.id);
    if (!req.query.id){
      return res.json({error: "id query is required"})
    }
    
    const existingUser = await User.findById(req.query.id);

    if (!existingUser) {
      return res.json({ error: "User does not exist" });
    }

    await User.findByIdAndDelete(req.query.id);

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res.json({ error: err });
  }
};