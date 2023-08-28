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
userRouter.get("/:id", isLoggedIn, getUser)
userRouter.delete("/:id", isLoggedIn, isAdmin, deleteUser)

userRouter.put("/reset-password", validateResetPassword, runValidation, resetPassword)

userRouter.put("/:id",upload.single("image"), isLoggedIn, isAdmin, updateUser)
userRouter.put("/ban-user/:id", isLoggedIn, isAdmin, bannedUserById)
userRouter.put("/unban-user/:id", isLoggedIn, isAdmin, unBannedUserById)
userRouter.put("/update-password/:id", isLoggedIn, validateUpdatePassword, runValidation, updatePassword)
userRouter.post("/forget-password/:id", validateForgetPassword, runValidation, forgetPassword)


module.exports = userRouter