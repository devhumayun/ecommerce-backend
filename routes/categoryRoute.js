const express = require("express")
const { validateUserRegistration } = require("../validators/auth")
const runValidation = require("../validators/validationRun")
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth")
const { createCategory } = require("../controller/categoryController")
const { categoryValidation } = require("../validators/categoryValidate")
const categoryRouter = express.Router()


categoryRouter.post("/",  isLoggedIn, categoryValidation, runValidation, createCategory )



module.exports = categoryRouter