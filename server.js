const express = require("express");
const app = express();
const { chats } = require("./chat");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();
app.use(express.json());

//creating an api to test if it is running or not
app.get("/", (req, res) => {
  res.send("Chat API is running!");
});
//creating an api for users login and register
app.use("/user", routes);

//creating api for chat
app.use("/chat", chatRoutes);

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
