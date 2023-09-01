const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { successResponse } = require("./responseController");
const { createJsonWebToken } = require("../helper/jsonWebToken");
const { accessTokenKey, refreshTokenKey } = require("../secret");
const {
  setRefreshTokenCookie,
  setAccessTokenCookie,
} = require("../helper/cookie");
const Product = require("../models/Product");
const { default: slugify } = require("slugify");

/**
 * post
 * api/v1/products
 * public
 */
const createProduct = async (req, res, next) => {
  try {
    // get body data
    const { name, description, price, quantity, sold, shipping, category } = req.body;

    // check image
    const image = req.file;
    if (!image) {
      throw createError(400, "Image file is requried");
    }
    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        throw createError(
          400,
          "File is too large, It should be less then 2 MB"
        );
      }
    }
    const imageBufferString = image.buffer.toString("base64");

    // Is product exists
    const productCheck = await User.exists({ name });
    if (productCheck) {
      throw createError(404, "Product already exists with this name");
    }

    // create product
    const product = await Product.create({
        name: name,
        slug: slugify(name),
        description: description,
        price: price,
        quantity: quantity,
        sold: sold,
        shipping: shipping,
        category: category,
        image: imageBufferString
    })

    return successResponse(res, {
      ststus: 201,
      message: `product was created successfull`,
      payload: {product}
    });
  } catch (error) {
    next(error);
  }
};

// export
module.exports = { createProduct };
