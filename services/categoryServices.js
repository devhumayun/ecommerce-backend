const slugify = require('slugify')
const Category = require("../models/Category")

const categoryService = async (name) => {
    const newCreateCategory = await Category.create({
        name: name,
        slug: slugify(name)
    })
    return newCreateCategory
}

const allCategories = async () => {
   return await Category.find().select("name slug").lean()
}

const SingleCategory = async (slug) => {
   return await Category.find({slug}).select("name slug").lean()
}

module.exports = {categoryService, allCategories, SingleCategory }