const express = require("express");
const { signupUser } = require("../controllers/userController");
const router = express.Router();

router.route("/").post(signupUser);

module.exports = router;
