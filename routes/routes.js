const express = require("express");
const { signupUser } = require("../controllers/userController");
const router = express.Router();
const { authenticateUser } = require("../controllers/userController");

router.route("/").post(signupUser);
router.post("/login", authenticateUser);

module.exports = router;
