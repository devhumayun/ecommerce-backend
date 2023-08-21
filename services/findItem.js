const mongoose = require("mongoose");
const createError = require("http-errors");
const User = require("../models/User");

/**
 * This function for getting item by id
 */

const findItemById = async (id, option) => {
  try {
    // get item
    const item = await User.findById(id, option);
    // create and error
    if (!item) throw createError(404, "item not exists in this id");

    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, "Invalid item id");
    }
    throw error;
  }
};

module.exports = { findItemById };
