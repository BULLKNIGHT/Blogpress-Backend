const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");

// Model
const userModel = require("../models/User");
const { findOne } = require("../models/User");

const isNullOrUndefined = (value) => value === null || value === undefined;
const SALT = 5;

// Api calls
router.get("/", async (req, res) => {
  res.send(await userModel.find({}));
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { userName, password, email } = req.body;
  const existingUser = await userModel.findOne({ userName });
  
  if (isNullOrUndefined(existingUser)) {
    const hashPwd = bcrypt.hashSync(password, SALT);
    const newUser = new userModel({ userName, password: hashPwd, email });
    await newUser.save();
    req.session.userId = newUser._id;
    res.status(201).send({ success: "Signed up" });
  } else {
    res.status(400).send({
      err: `Username ${userName} already exists, please choose another name`,
    });
  }
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const existingUser = await userModel.findOne({ userName });

  if (isNullOrUndefined(existingUser))
    res.status(401).send({ err: "userName does not exists" });
  else {
    const hashPwd = existingUser.password;
    if (bcrypt.compareSync(password, hashPwd)) {
      req.session.userId = existingUser._id;
      console.log(req.session);
      res.status(200).send({ success: "Logged in" });
    } else {
      res.status(401).send({ err: "Password is incorrect" });
    }
  }
});

router.get("/logout", async (req, res) => {
  if (!isNullOrUndefined(req.session)) {
    req.session.destroy(() => {
      console.log(req.session);
      res.sendStatus(200);
    });
  } else {
    res.sendStatus(200);
  }
});

module.exports = router;
