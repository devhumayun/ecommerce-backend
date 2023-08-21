const mongoose = require("mongoose");
const createError = require("http-errors");
const User = require("../models/User");

/**
 * This function for getting user by id
 */

const findUserById = async (id) => {
  try {
    // hide password
    const option = { password: 0 };
    // get user
    const user = await User.findById(id, option);
    // create and error
    if (!user) throw createError(404, "User not exists in this id");

    return user;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, "Invalid user id");
    }
    throw error;
  }
};

module.exports = { findUserById };
