const createError = require("http-errors");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");
const { categoryService, allCategories, SingleCategory, categoryUpdate, categoryDelete } = require("../services/categoryServices");
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
      ststus: 201,
      message: `Category was created successfull`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get
 * api/v1/category
 * admin
 * create category
 */
const getCategories = async (req, res, next) => {
  try {
    const categories = await allCategories()
    if(!categories){
        throw createError(404, "No category found with this slug")
    }
    return successResponse(res, {
      ststus: 200,
      message: `Categories fatched successfull`,
      payload: categories
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get
 * api/v1/categories/:slug
 */
const getCategory = async (req, res, next) => {
  try {
    const {slug} = req.params
    const category = await SingleCategory(slug)
    if(!category){
        throw createError(404, "No category found with this slug")
    }
    return successResponse(res, {
      ststus: 200,
      message: `Category fatched successfull`,
      payload: category
    });
  } catch (error) {
    next(error);
  }
};

/**
 * put
 * api/v1/categories/:slug
 */
const updateCategory = async (req, res, next) => {
  try {
    const {slug} = req.params
    const {name} = req.body


    const updatedCat = await categoryUpdate(slug, name)
    if(!updatedCat){
        throw createError(404, "No category found with this slug")
    }

    return successResponse(res, {
      ststus: 200,
      message: `Category fatched successfull`,
      payload: updatedCat
    });
  } catch (error) {
    next(error);
  }
};

/**
 * delete
 * api/v1/categories/:slug
 */
const deleteCategory = async (req, res, next) => {
    try {
      const {slug} = req.params
      const result = await categoryDelete(slug)
      if(!result){
          throw createError(404, "No category found with this slug")
      }
      return successResponse(res, {
        ststus: 200,
        message: `Category deleted successfull`,
      });
    } catch (error) {
      next(error);
    }
  };
  

// exports
module.exports = {
createCategory,
getCategories,
getCategory,
updateCategory,
deleteCategory
};
