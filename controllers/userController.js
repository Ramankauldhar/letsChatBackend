const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../token/generateToken");

const signupUser = asyncHandler(async (req, res) => {
  const { name, email, pswd, profilePic } = req.body;

  if (!name || !email || !pswd) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const userAlreadySignedUp = await User.findOne({ email });

  //checking if the user already exist
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
      message: "Sign Up Successfully",
    });
  } else {
    res.status(400);
    throw new Error("There was an erro while creating your profile");
  }
});

const authenticateUser = asyncHandler(async (req, res) => {
  const { email, pswd } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(pswd))) {
    res.json({
      message: "Sign In Successfully",
    });
  } else {
    res.status(401);
    throw new Error("Invalid User and Password");
  }
});

module.exports = { signupUser, authenticateUser };
