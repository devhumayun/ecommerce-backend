const express = require("express")
const { allUsers, getUser, deleteUser, createUser, accountActivation } = require("../controller/userController")
const upload = require("../middlewares/uploadFile")
const { validateUserRegistration } = require("../validators/auth")
const runValidation = require("../validators/validationRun")
const userRouter = express.Router()

userRouter.route('/').get(allUsers)
userRouter.post("/process-register", upload.single("image"), validateUserRegistration, runValidation, createUser )
// userRouter.route('/process-register', upload.single("image")).post(createUser)
userRouter.route('/verify').post(accountActivation)
userRouter.route('/:id').get(getUser).delete(deleteUser)

module.exports = userRouter