const express = require("express")
const { allUsers, getUser } = require("../controller/userController")
const userRouter = express.Router()

userRouter.route('/').get(allUsers)
userRouter.route('/:id').get(getUser)

module.exports = userRouter