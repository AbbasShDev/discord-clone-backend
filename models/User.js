const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
