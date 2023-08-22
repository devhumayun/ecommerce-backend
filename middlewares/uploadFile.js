const multer = require("multer")
const path = require('path')
const createError = require("http-errors")
const { USER_IMAGE_UPLOAD_DIRECTORY, ALLOWED_FILE, MAX_FILE_UPLOAD_SIZE } = require("../config")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, USER_IMAGE_UPLOAD_DIRECTORY)
    },
    filename: function (req, file, cb) {
     const extname = path.extname(file.originalname)
     cb(null, Date.now() + "-" + file.originalname.replace(extname, "") + extname)
    }
})

const filter = (req, file, cb) => {
    const extname = path.extname(file.originalname)
    if(!ALLOWED_FILE.includes(extname.substring(1))){

        console.log(ALLOWED_FILE);
        return cb(createError(400, "File type not allowed"))
    }
    cb(null, true)
}

  
const upload = multer({ storage: storage, limits: {fieldSize:MAX_FILE_UPLOAD_SIZE}, filter })
module.exports = upload