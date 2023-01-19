let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router(),
  bcrypt = require("bcrypt");

const { response } = require("express");
// User Model
let userSchema = require("../models/User");

router.post("/sign-up", async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userSchema.findOne({ email });
  if (user) {
    return res.json("User '" + email + "' already exists.");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password.toString(), parseInt(salt));
  req.body.password = hashPassword;
  userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send(true);
      // res.json(data);
    }
  });
});

router.post("/sign-in", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.status(400).send("Incorrect email.");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Incorrect password.");
  }
  return res.status(200).send(true);
});

module.exports = router;
