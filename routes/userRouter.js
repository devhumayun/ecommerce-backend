const express = require("express")
const { allUser } = require("../controller/userController")
const userRouter = express.Router()

userRouter.route('/').get(allUser)

module.exports = userRouter