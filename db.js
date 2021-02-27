const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://malayhalder:mo9903223306@cluster0.i5oku.mongodb.net/Blogpress?retryWrites=true&w=majority";

// connect db
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("Error in DB connection", err);
  });
