const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { accessTokenKey} = require('../secret');
const User = require("../models/User");
/**
 * Check users islogged in
 */
const isLoggedIn = async ( req, res, next ) =>{
    try {
        // get access token
        const accessToken = req.cookies.access_token
        if(!accessToken){
            return next(createError(404, "Token not found. Please login first"))
        }
        // verify token
        const decoded = jwt.verify(accessToken, accessTokenKey)
        if(!decoded){
            throw createError(401, "Invalid Token")
        }
        req.body.userId = decoded._id
        next()
    } catch (error) {
        return next(error)
    }
}

/**
 * check user is logged out
 */
const isLoggedOut = async ( req, res, next ) =>{
    try {
        // get access token
        const accessToken = req.cookies.access_token
        if(accessToken){
            return next(createError(400, "User is already logged in"))
        }
        next()
    } catch (error) {
        return next(error)
    }
}
/**
 * check user is admin
 */
const isAdmin = async ( req, res, next ) =>{
    try {
        // get id
        const id = req.body.userId
        const user = await User.findById(id)
        if(!user.isAdmin){
            throw createError(400, "You are not able to access this resources. Only admin can access")
        }
        next()
    } catch (error) {
        return next(error)
    }
}

// exports
module.exports = { isLoggedIn, isLoggedOut, isAdmin }