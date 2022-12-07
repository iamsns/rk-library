const { body } = require("express-validator");

const User = require("../models/auth");

exports.loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter valid email!!")
    .custom((value, { req }) => {
      console.log("enterr");
      return User.findOne({ email: value })
        .then((user) => {
          if (!user) {
            return Promise.reject("User not found, please enter valid email!!");
          }
          console.log("enterr222");
          return true;
        })
        .catch((err) => {
          console.log(err);
          console.log("errrrr");
          return Promise.reject(err);
        });
    }),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password length must be between 8 and 20!!")
    .not()
    .isIn(["12345678", "qwertyui", "password"])
    .withMessage("Please don't use common password!!"),
];

exports.signupValidation = [
  body("email")
    .isEmail()
    .withMessage("Please enter valid email!!")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email is already exists!!");
        }
        return true;
      });
    }),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password length must be between 8 and 20!!")
    .not()
    .isIn(["12345678", "qwertyui", "password"])
    .withMessage("Please don't use common password!!"),

  body("confirmPassword", "Password not matched!").custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error("Password not matched!!");
    }
    return true;
  }),

  body("firstName")
    .isLength({ min: 3, max: 20 })
    .withMessage("First name length must be between 3 to 20!!")
    .trim(),
  body("lastName")
    .isLength({ min: 3, max: 20 })
    .withMessage("Last name length must be between 3 to 20!!")
    .trim(),
  body("mobileNumber", "Please enter valid mobile number")
    .isLength({ min: 10, max: 10 })
    .isInt(),
];
