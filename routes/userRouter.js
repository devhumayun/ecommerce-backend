const express = require("express")
const { allUsers, getUser, deleteUser, createUser, accountActivation } = require("../controller/userController")
const userRouter = express.Router()

userRouter.route('/').get(allUsers)
userRouter.route('/process-register').post(createUser)
userRouter.route('/verify').post(accountActivation)
userRouter.route('/:id').get(getUser).delete(deleteUser)

module.exports = userRouter