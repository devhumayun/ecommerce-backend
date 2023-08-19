const express = require("express")
const { allSeedUsers } = require("../controller/seedController")
const seedRouter = express.Router()

seedRouter.route('/').get(allSeedUsers)

module.exports = seedRouter