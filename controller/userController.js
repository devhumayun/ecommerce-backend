const createError = require("http-errors");
const fs = require("fs")
const User = require("../models/User");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");
const { findItemById } = require("../services/findItem");

/**
 * Get
 * api/v1/users
 * public
 * Get all users with Search result and Pagination
 */
const allUsers = async (req, res, next) => {
  try {
    // search query init
    const search = req.query.search || "";
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    // search RegEx
    const searchRegEx = new RegExp(".*" + search + ".*", "i");
    const option = { password: 0 };

    // create a search filter
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegEx } },
        { email: { $regex: searchRegEx } },
        { phone: { $regex: searchRegEx } },
      ],
    };

    // count all users documents
    const count = await User.find(filter).countDocuments();

    // find users
    const users = await User.find(filter, option)
      .limit(limit)
      .skip((page - 1) * limit);

    // create a error
    if (!users) throw createError(404, "users not found");

    // create a success msg
    return successResponse(res, {
      ststus: 200,
      message: "All users were retured successfull",
      payload: {
        users,
        pagenation: {
          totalPage: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 < 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get
 * api/v1/users/:id
 * public
 * Get Single user
 */
const getUser = async (req, res, next) => {
  try {
    // get user id
    const id = req.params.id;
    // hide password
    const option = { password: 0 };
    const user = await findItemById(User, id, option);
    // response from responseController
    return successResponse(res, {
      ststus: 200,
      message: "User get Successfull",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * delete
 * api/v1/users/:id
 * admin
 * Delete user without admin
 */
const deleteUser = async (req, res, next) => {
  try {
    // get user id
    const id = req.params.id;
    // hide password
    const option = { password: 0 };
    const user = await findItemById(User,id, option);
    
    // delete user image
    // const userImagePath = user?.image
    // fs.access(userImagePath, (err) => {
    //   if(err){
    //     console.log("user Image not exists");
    //   }else {
    //     fs.unlink(userImagePath, (err) =>{
    //       if(err) throw err
    //       console.log("user image deleted successfull");
    //     })
    //   }
    // })

    // user delete
    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false
    })

    // response from responseController
    return successResponse(res, {
      ststus: 200,
      message: "User deleted Successfull",
    });

  } catch (error) {
    next(error);
  }
};

// exports
module.exports = { allUsers, getUser, deleteUser };
