const {Schema, model } = require("mongoose")

const productSchema = new Schema({
    // name, slug, description, price, sold, quantity, shipping, image, category 
    name: {
        type: String,
        requried: [true, "Product name is requried"],
        trim: true,
        unique: true,
        minlangth: [3, "The lenght of Product name should be  minimun 3 characters long"],
    },
    slug: {
        type: String,
        requried: [true, "Slug is requried"],
        trim: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        requried: [true, "Product description is requried"],
        trim: true,
    },
    price:{
        type:Number,
        requried: [true, "Product price is requried"],
        trim: true,
        validate:{
            validator: (v) => v > 0,
            message: (props) => `${props.value} is not a valid price`
        }
    },
    sold: {
        type: Number,
        trim: true,
        default: 0,
        validate : {
            validator : (v) => v >= 0,
            message: (props) => `${props.value} is not a valid price`
        }
    },
    quantity : {
        type: Number,
        trim: true,
        requried: [true, "Product quantity is requried"],
        validate : {
            validator : (v) => v > 0,
            message: (props) => `${props.value} is not a valid number`
        }
    },
    shipping : {
        type: Number,
        trim: true,
        default: 0,
        validate : {
            validator : (v) => v >= 0,
            message: (props) => `${props.value} is not a valid number`
        }
    },
    image: {
        type: Buffer,
        contentType: String,
        requried: [true, "Product image is requried"]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        requried: true
    }
}, {
    timestamps: true
})

const Product = model("Product", productSchema)
module.exports = Product