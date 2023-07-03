const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatDataModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    console.log("Id param not sent with request");
    return res.sendStatus(400);
  }
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: id } } },
    ],
  })
    .populate("users", "-pswd")
    .populate("newMessage");
  isChat = await User.populate(isChat, {
    path: "newMesage.sender",
    select: "name profilePic email",
  });

  //if there is a chat, return it, otherwise create one
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, id],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const Fullchat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-pswd"
      );

      res.status(200).send(Fullchat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});
module.exports = { accessChat };
