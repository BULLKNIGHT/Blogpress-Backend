const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
  {
    like: { type: Boolean },
    comment: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    blogId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("rate", rateSchema);
