const { validationResult } = require("express-validator");
const { errorResponse } = require("../controller/responseController");
const runValidation = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return errorResponse(res, {
                statusCode: 422,
                message: errors.array()[0].msg
            })
        }
        next()
    } catch (error) {
        return next(error)
    }
}

// exports
module.exports = runValidation