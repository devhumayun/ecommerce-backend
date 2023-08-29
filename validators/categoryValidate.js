const { body } = require("express-validator");

const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is requried")
];

// exports
module.exports = { categoryValidation };
