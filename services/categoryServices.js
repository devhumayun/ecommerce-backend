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

const categoryUpdate = async (slug, name) => {
   const filter = {slug}
   const updates = {$set: {name: name, slug: slugify(name)}}
   const option = { new: true }
   const catUpdate = await Category.findOneAndUpdate(filter, updates, option)
   return catUpdate
}

const categoryDelete = async (slug) => {
    return await Category.findOneAndDelete({slug})
 }
 

module.exports = {categoryService, allCategories, SingleCategory,categoryUpdate, categoryDelete}