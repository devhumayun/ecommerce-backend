const express = require("express")
const { allSeedUsers, allSeedProducts } = require("../controller/seedController")
const seedRouter = express.Router()

// all user
seedRouter.route('/').get(allSeedUsers)
// all products
seedRouter.route('/products').get(allSeedProducts)


module.exports = seedRouter