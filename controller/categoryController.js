const createError = require("http-errors");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");
const { categoryService, allCategories } = require("../services/categoryServices");
/**
 * POST
 * api/v1/category
 * admin
 * create category
 */
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body
    await categoryService(name)
    return successResponse(res, {
      ststus: 200,
      message: `Category was created successfull`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Post
 * api/v1/category
 * admin
 * create category
 */
const getCategories = async (req, res, next) => {
  try {
    const categories = await allCategories()
    return successResponse(res, {
      ststus: 200,
      message: `Categories fatched successfull`,
      payload: categories
    });
  } catch (error) {
    next(error);
  }
};


// exports
module.exports = {
createCategory,
getCategories
};
