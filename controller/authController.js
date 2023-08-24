const createError = require("http-errors");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { successResponse } = require("./responseController");
const { createJsonWebToken } = require("../helper/jsonWebToken");
const { accessTokenKey } = require("../secret");

/**
 * post
 * api/v1/auth/login
 * public
 */
const login = async ( req, res, next ) => {
    try {
        // login data
        const { email, password } = req.body
        // isExists email
        const user = await User.findOne({email})
        if(!user){
            return next(createError(404,"User doesn't exists with this email"))
        }
        // compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return next(createError(401,"Wrong Password"))
        }
        // isBanned
        if(user.isBanned){
            return next(createError(403,"You are banned. Please contact with the authority"))
        }
        // token, cookie
        const accessToken = createJsonWebToken({email}, accessTokenKey, "15m")
        res.cookie("access_token", accessToken, {
            maxAge: 15 * 60 * 1000, //15 minute
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        // create a success msg
        return successResponse(res, {
            ststus: 200,
            message: "Logged in successfull",
            payload: {user},
        });
    } catch (error) {
        next(error)
    }
}
/**
 * post
 * api/v1/auth/login
 * public
 */
const logout = async ( req, res, next ) => {
    try {
        res.clearCookie("access_token")
        // create a success msg
        return successResponse(res, {
            ststus: 200,
            message: "Logged out successfull",
            payload: {},
        });
    } catch (error) {
        next(error)
    }
}


// export
module.exports = { login, logout }