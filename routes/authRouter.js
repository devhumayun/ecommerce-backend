const express = require("express")
const runValidation = require("../validators/validationRun")
const { login, logout } = require("../controller/authController")
const authRouter = express.Router()

authRouter.post("/login", login)
authRouter.post("/logout", logout)

module.exports = authRouter