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
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid User and Password");
  }
});

//this is to search the user from database (localhost:5000/user?search=name)
const allUsersData = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          //i is for case insensivity to match upper and lower cases
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : //this is else consition where I do not want to perform anything
      {};

  // searching other users , not the current user
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { signupUser, authenticateUser, allUsersData };
