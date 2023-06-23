const express = require("express");
const app = express();
const { chats } = require("./chat");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
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

//calling the db connection function
dbconn().catch((err) => console.log(err));

async function dbconn() {
  await mongoose.connect(process.env.MONGODB_CONN);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  console.log("Mongo DB connected");
}
