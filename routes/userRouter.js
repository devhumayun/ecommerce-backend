const express = require("express")
const { allUsers, getUser, deleteUser, accountActivation, registerProcess, updateUser } = require("../controller/userController")
const upload = require("../middlewares/uploadFile")
const { validateUserRegistration } = require("../validators/auth")
const runValidation = require("../validators/validationRun")
const { isLoggedIn, isLoggedOut } = require("../middlewares/auth")
const userRouter = express.Router()


userRouter.get("/", isLoggedIn, allUsers)
userRouter.post("/process-register", upload.single("image"), isLoggedOut, validateUserRegistration, runValidation, registerProcess )
// userRouter.route('/activate').post(accountActivation)
userRouter.post("/activate", isLoggedOut, accountActivation)
userRouter.get("/:id", isLoggedIn, getUser)
userRouter.delete("/:id", isLoggedIn, deleteUser)
userRouter.put("/:id",upload.single("image"), isLoggedIn, updateUser)

module.exports = userRouter