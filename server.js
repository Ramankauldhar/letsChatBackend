const express = require("express");
const app = express();
const { chats } = require("./chat");
const dotenv = require("dotenv");
dotenv.config();

//creating an express api
app.get("/", (req, res) => {
  res.send("Chat API is running!");
});
app.get("/chats", (req, res) => {
  res.send(chats);
});
app.get("/chats/:id", (req, res) => {
  const singleChat = chats.find((chatData) => chatData._id === req.params.id);
  res.send(singleChat);
});

//created a node server, which is running on port :5000 or 2019
const PORT = process.env.PORT || 2023;
app.listen(PORT, console.log(`Server started on Port:${PORT}`));
