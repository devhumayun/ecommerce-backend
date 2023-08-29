const slugify = require('slugify')
const category = require("../models/Category")
const categoryService = async (name) => {
    const newCreateCategory = await category.create({
        name: name,
        slug: slugify(name)
    })
    return newCreateCategory
}

module.exports = {categoryService}