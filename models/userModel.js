const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pswd: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "../pics/defaultuser.png",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (userPswd) {
  return await bcrypt.compare(userPswd, this.pswd);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.pswd = await bcrypt.hash(this.pswd, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
