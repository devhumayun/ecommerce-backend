const { body } = require("express-validator");

// Registration validation
const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is requried")
    .isLength({min: 3 })
    .withMessage("Product name should be al least 3 characters long"),

];


// exports
module.exports = {validateUserRegistration};
