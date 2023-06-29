const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  signupUser,
  authenticateUser,
  allUsersData,
} = require("../controllers/userController");
//for sign up the new user and to get all users data (allUsersData)
router.route("/").post(signupUser).get(auth, allUsersData);
//for sign in the user
router.post("/login", authenticateUser);

module.exports = router;
