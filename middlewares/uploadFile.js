const multer = require("multer")
const path = require('path')
const { ALLOWED_FILE, MAX_FILE_UPLOAD_SIZE } = require("../config")
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if(!file.mimetype.startsWith("image/")){
        cb(new Error("Only image are allowed"), false)
    }
    if(file.size > MAX_FILE_UPLOAD_SIZE ){
        cb(new Error("File size is larger than maximum limits"), false)
    }
    if(!ALLOWED_FILE.includes(file.mimetype)){
        cb(new Error("File tyle is not allowed"), false)
    }
    cb(null, true)
}

  
const upload = multer({ storage: storage, fileFilter:fileFilter })
module.exports = upload