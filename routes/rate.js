const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");

const isNullOrUndefined = (value) => value === null || value === undefined;

// models
const rateModel = require("../models/Rate");

const AuthMiddleware = async (req, res, next) => {
  if (isNullOrUndefined(req.session) || isNullOrUndefined(req.session.userId))
    res.status(401).send({ err: "Not logged in" });
  else next();
};

// Api calls
router.get("/", async (req, res) => {
  res.send(await rateModel.find({}));
});

router.post("/", async (req, res) => {
  const { like, comment, blogId, userId } = req.body;
  const newRate = new rateModel({ like, comment, blogId, userId });
  await newRate.save();
  res.status(201).send(newRate);
});

router.put("/:rateId", async (req, res) => {
  const { like, comment, blogId, userId } = req.body;
  try {
    const rate = await rateModel.findOne({ _id: req.params.rateId });
    if (isNullOrUndefined(rate)) res.sendStatus(404);
    else {
      if (!isNullOrUndefined(like)) rate.like = like;
      if (!isNullOrUndefined(comment)) rate.comment = comment;
      await rate.save();
      res.send(rate);
    }
  } catch (err) {
    res.sendStatus(404);
  }
});

router.delete("/:rateId", async (req, res) => {
  try {
    await rateModel.deleteOne({ _id: req.params.rateId });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(404);
  }
});

module.exports = router;
