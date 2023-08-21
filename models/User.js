const {Schema, model} = require("mongoose")
const defaultImagePath = require(".././secret")
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    name: {
        type: String,
        requried: [true, "User name is requried"],
        trim: true,
        minlenght: [3, "The lenght of user name minimun 3 characters"],
        maxlenght: [31, "The lenght of user name maximum 31 characters"]
    },
    email: {
        type: String,
        requried: [true, "User email is requried"],
        trim: true,
        lowercase: true,
        unique: true,
        validate:{
            validator: function(v) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v)
            },
            message: "Invalid email"
        }
    },
    password: {
        type: String,
        requried: [true, "User password is requried"],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    image: {
        type: String,
    },
    phone: {
        type: String,
        requried: [true, "User phone is requried"],
        unique: true
    },
    address : {
        type: String,
        requried: [true, "User address is requried"],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const User = model("Users", userSchema)
module.exports = User