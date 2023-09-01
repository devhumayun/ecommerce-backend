const { body } = require("express-validator");

// Registration validation
const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is requried")
    .isLength({min: 3 })
    .withMessage("Product name should be al least 3 characters long"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is requried"),
  body("price")
    .notEmpty()
    .withMessage("Product price is requried")
    .isFloat({min: 0})
    .withMessage("Price should be positive number"),
  body("quantity")
    .notEmpty()
    .withMessage("Product quantity is requried")
    .isInt({min: 1})
    .withMessage("Quantity should be positive integer"),
  // body("image")
  //   .notEmpty()
  //   .withMessage("Product image is requried"),
  body("category")
    .notEmpty()
    .withMessage("Product Category is requried"),
];


// exports
module.exports = {validateUserRegistration};
