const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");

const isNullOrUndefined = (value) => value === null || value === undefined;

// models
const blogModel = require("../models/Blog");

const AuthMiddleware = async (req, res, next) => {
  if (isNullOrUndefined(req.session) || isNullOrUndefined(req.session.userId))
    res.status(401).send({ err: "Not logged in" });
  else next();
};

// Api calls
router.get("/:userId", async (req, res) => {
  res.send(await blogModel.find({ userId: req.params.userId }));
});

router.post("/", async (req, res) => {
  const { title, description, category, userId } = req.body;
  const newBlog = new blogModel({ title, description, category, userId });
  await newBlog.save();
  res.status(201).send(newBlog);
});

router.put("/:blogId", async (req, res) => {
  const { title, description, category, userId } = req.body;
  try {
    const blog = await blogModel.findOne({ _id: req.params.blogId });
    if (isNullOrUndefined(blog)) res.sendStatus(404);
    else {
      if (!isNullOrUndefined(title)) blog.title = title;
      if (!isNullOrUndefined(description)) blog.description = description;
      if (!isNullOrUndefined(category)) blog.category = category;
      await blog.save();
      res.send(blog);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

router.delete("/:blogId", async (req, res) => {
  try {
    await blogModel.deleteOne({ _id: req.params.blogId });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
  }
});

module.exports = router;
