const jwt = require("jsonwebtoken")

const createJsonWebToken = (payload, secretKey, expiresIn) => {
    
    if(payload ==! "object" || !payload){
        throw new Error("Payload must be a non-empty object")
    }
    if(secretKey ==! "string" || secretKey === ""){
        throw new Error("SecretKey must be a non-empty String")
    }
    
    try {
       const token = jwt.sign(payload, secretKey, {expiresIn});
       return token
    } catch (error) {
        console.error(error)
        throw error
    }
}

// exports
module.exports = { createJsonWebToken }