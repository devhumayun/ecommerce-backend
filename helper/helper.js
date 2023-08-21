const fs = require("fs").promises
/**
 * dynamic image deleting function
 * @param {*} userImagePath 
 */

const deleteImage = async (userImagePath) => {
    try {
        await fs.access(userImagePath)
        await fs.unlink(userImagePath)
        console.log("image deleted successfull")
    } catch (error) {
        console.error("Image not exists")
    }
}

// export helpers
module.exports = { deleteImage }