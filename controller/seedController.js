const User = require("../models/User.js")
const data = require("../data.js")

const allSeedUsers = async (req, res, next) => {
    try {
        // deleting all users
        await User.deleteMany({})

        // insert user
        const users = await User.insertMany(data.users)

        // create a response message
        res.status(200).json(users)

    } catch (error) {
        next(error)
    }
}

module.exports = { allSeedUsers }









