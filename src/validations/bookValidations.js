const { body } = require("express-validator");

exports.categoryValidation = [
  body("name", "Please enter a valid category name!")
    .isLength({ min: 3, max: 100 })
    .trim(),
];

exports.bookValidation = [
  body("title", "Please enter a valid title")
    .isLength({ min: 5, max: 30 })
    .trim(),
  body("author", "Please enter a valid author name")
    .isLength({ min: 3, max: 30 })
    .trim(),
  body("categories", "Please select atease one category")
    .isArray()
    .bail()
    .notEmpty(),
  body("edition", "Please choose a valid year")
    .isInt()
    .bail()
    .not()
    .isString()
    .bail()
    .isLength({ min: 4, max: 4 }),
  body("language", "Please enter a valid language")
    .isLength({ min: 3, max: 20 })
    .bail()
    .isAlpha()
    .trim(),
  body("pages", "Please enter valid number")
    .isInt()
    .bail()
    .not()
    .isString()
    .bail()
    .isLength({ min: 1, max: 4 }),
  body("description", "Please enter upto 100 letters!")
    .isLength({ max: 100 })
    .trim(),
];
