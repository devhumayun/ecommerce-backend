const { body } = require("express-validator");

// Registration validation
const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is requried")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name should be al least 3-31 characters long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is requried")
    .isEmail()
    .withMessage("Invalid Email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is requried")
    .isLength({ min: 8 })
    .withMessage("Password should be al least 8 characters long"),
    // .matches(/^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"$/)
    // .withMessage("Password must be 8 characters including one uppercase letter, one special character and alphanumeric characters"),
  body("phone").trim().notEmpty().withMessage("Phone is requried"),
  body("address").trim().notEmpty().withMessage("address is requried"),
  body("image").optional().isString(),
];
// sig in  validation

// exports
module.exports = { validateUserRegistration };
