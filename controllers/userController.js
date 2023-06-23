const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../token/generateToken");

const signupUser = asyncHandler(async (req, res) => {
  const { name, email, pswd, profilePic } = req.body;

  if (!name || !email || !pswd) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const userAlreadySignedUp = await User.findone({ email });

  if (userAlreadySignedUp) {
    res.status(400);
    throw new Error("User Allready Signed Up");
  }

  const newUser = await User.create({
    name,
    email,
    pswd,
    profilePic,
  });
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePic: newUser.profilePic,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("There was an erro while creating your profile");
  }
});

module.exports = { signupUser };
