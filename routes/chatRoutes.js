const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { accessChat, getChatData } = require("../controllers/chatController");

//creating end point to access the chat of the user (One on One Chat) and using auth to check if the user logged in or not?
router.route("/").post(auth, accessChat);
router.route("/").get(auth, getChatData);

//for creating a group chat
//router.route("/groupChat").post(auth, createGroupChat);
//this is to update (put) the group chat
//router.route("/renameGroupChat").put(auth, renameGroupChat);
//router.route("removeGroup").put(auth, removeFromGroup);
//router.route("/addGroup").put(auth, addNewpersonToGroup);

module.exports = router;
