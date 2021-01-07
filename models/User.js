const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    followingId: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
    followersId: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
