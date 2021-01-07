const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    ratesId: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('blog', blogSchema);