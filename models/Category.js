const {Schema, model} = require("mongoose")

const categorySchema = new Schema({
    name: {
        type: String,
        requried: [true, "Category name is requried"],
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        requried: [true, "Slug is requried"],
        trim: true,
        unique: true,
        lowercase: true
    }
}, {
    timestamps: true
})

const Category = model("Category", categorySchema)
module.exports = Category