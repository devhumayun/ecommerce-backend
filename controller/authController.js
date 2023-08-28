const createError = require("http-errors");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { successResponse } = require("./responseController");
const { createJsonWebToken } = require("../helper/jsonWebToken");
const { accessTokenKey, refreshTokenKey } = require("../secret");
const { setRefreshTokenCookie, setAccessTokenCookie } = require("../helper/cookie");

/**
 * post
 * api/v1/auth/login
 * public
 */
const login = async ( req, res, next ) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if(!user){
            return next(createError(404,"User doesn't exists with this email"))
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return next(createError(401,"Wrong Password"))
        }
        if(user.isBanned){
            return next(createError(403,"You are banned. Please contact with the authority"))
        }
        const accessToken = createJsonWebToken({_id: user._id}, accessTokenKey, "1m")
        setAccessTokenCookie(res, accessToken)
        const refreshToken = createJsonWebToken({_id: user._id}, refreshTokenKey, "7d")
        setRefreshTokenCookie(res, refreshToken)

        const userWithoutPassword = user.toObject()
        delete userWithoutPassword.password
        return successResponse(res, {
            ststus: 200,
            message: "Logged in successfull"
        });
    } catch (error) {
        next(error)
    }
}
/**
 * post
 * api/v1/auth/logout
 * public
 */
const logout = async ( req, res, next ) => {
    try {
        res.clearCookie("access_token")
        res.clearCookie("refresh_token")
        return successResponse(res, {
            ststus: 200,
            message: "Logged out successfull",
            payload: {},
        });
    } catch (error) {
        next(error)
    }
}
/*
 * get
 * api/v1/auth/refresh-token
 * public
 */
const refreshToken = async ( req, res, next ) => {
    try {
        
        const refresh_token = req.cookies.refresh_token
        if(!refresh_token){
            throw createError(404, "Refresh token missing")
        }
        const decodedToken = jwt.verify(refresh_token, refreshTokenKey )
        if(!decodedToken){
            throw createError(404, "Invalid Token")
        }
        const user = await User.findById(decodedToken._id).select("password")
       
        // token, cookie
        const accessToken = createJsonWebToken({user}, accessTokenKey, "10m")
        setAccessTokenCookie(res,accessToken)
        return successResponse(res, {
            ststus: 200,
            message: "access token generated success",
        });
    } catch (error) {
        next(error)
    }
}
const protectedRoute = async ( req, res, next ) => {
    try {
        
        const access_token = req.cookies.access_token
        if(!access_token){
            throw createError(404, "Access token missing, Please log in again")
        }
        const decodedToken = jwt.verify(access_token, accessTokenKey)
        if(!decodedToken){
            throw createError(404, "Invalid Token")
        }

        return successResponse(res, {
            ststus: 200,
            message: "Protected route resource access successfull",
        });
    } catch (error) {
        next(error)
    }
}


// export
module.exports = { login, logout, refreshToken, protectedRoute }