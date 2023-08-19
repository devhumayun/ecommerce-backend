const createError = require("http-errors")
const User = require("../models/User")

/**
 * get all user
 */
const allUser = async (req, res, next) => {
    try {

        // search query init
        const search = req.query.search || ""
        const page = Number(req.query.page || 1)
        const limit = Number(req.query.limit || 2)

        // search RegEx
        const searchRegEx = new RegExp(".*" + search + ".*", "i")
        const option = {password: 0}

        // create a search filter
        const filter = {
            isAdmin: {$ne:true},
            $or:[
                {name: {$regex:searchRegEx}},
                {email: {$regex:searchRegEx}},
                {phone: {$regex:searchRegEx}}
            ]
        }

        // count all users documents
        const count = await User.find(filter).countDocuments()

        // find users
        const users = await User.find (filter, option)
        .limit(limit).skip((page -1)*limit)
        
        // create a error
        if(!users) throw createError(404, "users not found")

        // create a success msg
        res.status(200).json({
            success: true,
            users,
            pagenation: {
                totalPage: Math.ceil(count / limit),
                currentPage: page,
                previousPage: page -1 < 0 ? page -1 : null,
                nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null
            }
        })
        
    } catch (error) {
        next(error)
    }
}










// exports
module.exports = {allUser}