
/**
 * error response handler
 */
const errorResponse = (res, {statusCode = 500, message = "Internal Server Error"}) => {
    return res.status(statusCode).json({
        success: false,
        message 
    })
}


/**
 * success response handler
 */
const successResponse = (res, {statusCode = 200, message = "Success", payload={}}) => {
    return res.status(statusCode).json({
        success: true,
        message,
        payload
    })
}


//  export
module.exports = { errorResponse, successResponse }