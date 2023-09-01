const express = require("express")
const upload = require("../middlewares/uploadFile")
const runValidation = require("../validators/validationRun")
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth")
const { createProduct } = require("../controller/productController")
const { validateUserRegistration } = require("../validators/productValidate")
const productRouter = express.Router()


productRouter.post("/", upload.single("image"), isLoggedIn, validateUserRegistration, runValidation, createProduct)


module.exports = productRouter