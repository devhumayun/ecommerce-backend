const express = require("express")
const { allUsers, getUser, deleteUser } = require("../controller/userController")
const userRouter = express.Router()

userRouter.route('/').get(allUsers)
userRouter.route('/:id').get(getUser).delete(deleteUser)

module.exports = userRouter