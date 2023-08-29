const express = require("express")
const { validateUserRegistration } = require("../validators/auth")
const runValidation = require("../validators/validationRun")
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth")
const { createCategory, getCategories } = require("../controller/categoryController")
const { categoryValidation } = require("../validators/categoryValidate")
const categoryRouter = express.Router()


categoryRouter.post("/",  isLoggedIn, categoryValidation, runValidation, createCategory )
categoryRouter.get("/",  getCategories )



module.exports = categoryRouter