const express = require("express");
const cors = require("cors");
const session = require("express-session");

const session_secret = "Blogpress";

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(
  session({
    secret: session_secret,
    cookie: { maxAge: 1 * 60 * 60 * 1000 },
  })
);

// DB Connection
require("./db");

// Models

// Routes calls
app.use("/", require("./routes/user"));
app.use("/blogs", require("./routes/blog"));
app.use("/rates", require("./routes/rate"));

app.listen(8888, () => {
  console.log("Server listen at port 9999!");
});
