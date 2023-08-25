const express = require("express")
const runValidation = require("../validators/validationRun")
const { login, logout } = require("../controller/authController")
const { isLoggedOut, isLoggedIn } = require("../middlewares/auth")
const { validateUserSign } = require("../validators/auth")
const authRouter = express.Router()

authRouter.post("/login", validateUserSign, runValidation, isLoggedOut, login)
authRouter.post("/logout", isLoggedIn, logout)

module.exports = authRouter

