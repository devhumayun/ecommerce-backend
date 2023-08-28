const express = require("express")
const { allUsers, getUser, deleteUser, accountActivation, registerProcess, updateUser, bannedUserById, unBannedUserById, updatePassword, forgetPassword, resetPassword } = require("../controller/userController")
const upload = require("../middlewares/uploadFile")
const { validateUserRegistration, validateUpdatePassword, validateForgetPassword, validateResetPassword } = require("../validators/auth")
const runValidation = require("../validators/validationRun")
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middlewares/auth")
const userRouter = express.Router()


userRouter.get("/", isLoggedIn, isAdmin, allUsers)
userRouter.post("/process-register", upload.single("image"), isLoggedOut, validateUserRegistration, runValidation, registerProcess )
// userRouter.route('/activate').post(accountActivation)
userRouter.post("/activate", isLoggedOut, accountActivation)
userRouter.get("/:id([0-8a-fA-F]{24})", isLoggedIn, getUser)
userRouter.delete("/:id([0-8a-fA-F]{24})", isLoggedIn, isAdmin, deleteUser)

userRouter.put("/reset-password", validateResetPassword, runValidation, resetPassword)

userRouter.put("/:id([0-8a-fA-F]{24})",upload.single("image"), isLoggedIn, isAdmin, updateUser)
userRouter.put("/ban-user/:id([0-8a-fA-F]{24})", isLoggedIn, isAdmin, bannedUserById)
userRouter.put("/unban-user/:id([0-8a-fA-F]{24})", isLoggedIn, isAdmin, unBannedUserById)
userRouter.put("/update-password/:id([0-8a-fA-F]{24})", isLoggedIn, validateUpdatePassword, runValidation, updatePassword)
userRouter.post("/forget-password/:id([0-8a-fA-F]{24})", validateForgetPassword, runValidation, forgetPassword)


module.exports = userRouter