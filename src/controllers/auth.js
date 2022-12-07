const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/auth");
const jwtTokens = require("../utils/jwtTokens");
const {validationResult} = require('express-validator')
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;
  const errors = validationResult(req)
  console.log(errors.array())
  if (!errors.isEmpty()) {
    console.log("got issue in data");
    return res.status(422).json({ status: 422, errors : errors.array(), message: "Validation Errors!!" });
  }
  return User.findOne({ email: email })
    .then((user) => {
      console.log("userResult", user);
      if (!user) {
        return res.status(400).json({ status: 400, message: "No user found!" });
      }
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          console.log("findresult", result);
          if (!result) {
            return res.status(400).json({ status: 400, message: "Password not matched!" });
          }
          const token = jwtTokens.createToken({email : email, iat : Date.now()})
          if (token) {
            return res.status(200).json({ status: 200, message: "Success!", token:token });
          }
          return res.status(400).json({ status: 400, message: "Token error!" });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ name: err.name, message: err.message });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ name: err.name, message: err.message });
    });
};


exports.register = (req, res, next) => {
  console.log(req.body);
  const body = req.body;
  const errors = validationResult(req)
  console.log(errors.array())
  if (!errors.isEmpty()) {
    return res.status(422).json({status:422, message: "Validation Errors", errors : errors.array()})
  }
  bcrypt
    .hash(body.password, parseInt(process.env.SALT_ROUNDS))
    .then((hashedPassword) => {
      const user = new User({ ...req.body, password: hashedPassword });
      return user
        .save()
        .then((result) => {
          console.log("usersave", result);
          res.json({ status: 200, message: "User saved successfully!!" });
        })
        .catch((err) => {
          console.log("errorr", err);
          return res.json({ name: err.name, message: err.message });
        });
    })
    .catch((err) => {
      console.log("err", err);
      return res.json({ err: err });
    });
};
