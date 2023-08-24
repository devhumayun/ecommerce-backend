const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { accessTokenKey} = require('../secret')
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

// exports
module.exports = { isLoggedIn, isLoggedOut }