const express = require("express")
const { validateUserRegistration } = require("../validators/auth")
const runValidation = require("../validators/validationRun")
const { isLoggedIn, isAdmin } = require("../middlewares/auth")
const { createCategory, getCategories, getCategory, updateCategory} = require("../controller/categoryController")
const { categoryValidation } = require("../validators/categoryValidate")
const categoryRouter = express.Router()


categoryRouter.post("/",  isLoggedIn, categoryValidation, runValidation, createCategory )
categoryRouter.get("/",  getCategories)
categoryRouter.get("/:slug",  getCategory)
categoryRouter.put("/:slug", categoryValidation, runValidation, isLoggedIn, isAdmin, updateCategory)



module.exports = categoryRouter