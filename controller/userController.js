const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { successResponse } = require("./responseController");
const mongoose = require("mongoose");
const { findItemById } = require("../services/findItem");
const { deleteImage } = require("../helper/helper");
const { createJsonWebToken } = require("../helper/jsonWebToken");
const { jwtSecretKey, clientURL } = require("../secret");
const { sendMail } = require("../helper/sendMail");

/**
 * GET
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
 * GET
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
 * DELET
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
    const user = await findItemById(User, id, option);

    // delete user image
    const userImagePath = user?.image;
    deleteImage(userImagePath);

    // user delete
    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });

    // response from responseController
    return successResponse(res, {
      ststus: 200,
      message: "User deleted Successfull",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST
 * api/v1/users/process-register
 * admin
 * create user
 */
const createUser = async (req, res, next) => {
  try {
    // get body data
    const { name, email, password, phone, address } = req.body;

    // Is email exists
    const emailCheck = await User.exists({ email });
    if (emailCheck)
      throw createError(404, "Email already exists, Please sign in");
    // Is mobile exists
    const phoneCheck = await User.exists({ phone });
    if (phoneCheck)
      throw createError(
        404,
        "Already have an account with this number, Please sign in"
      );

    // create token
    const token = createJsonWebToken(
      { name, email, password, phone, address },
      jwtSecretKey,
      "10m"
    );
    // send email
    // sendMail({
    //   to: email,
    //   sub: "Account Activation Eemail",
    //   msg: `
    //     <h2> Hello ${name}! </h2>  
    //     <p> Please click here to <a href="${clientURL}/api/users/${token}"> activate your account </a> </p>
    //   `,
    // });

    return successResponse(res, {
      ststus: 200,
      message: `Check your ${email} to complete the registration process`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST
 * api/v1/users/verify
 * account activation
 */
const accountActivation = async (req, res, next) => {
  try {
    // get token
    const token = req.body.token;
    if (!token) throw createError(404, "Token not found");

    try {
      const decoded = jwt.verify(token, jwtSecretKey);
      if (!decoded) throw createError(401, "Unable to activate account");
      // Is email exists
      const emailCheck = await User.exists({ email: decoded.email });
      if (emailCheck)
        throw createError(404, "Email already exists, Please sign in");

      // create user

      await User.create(decoded);

      return successResponse(res, {
        ststus: 201,
        message: "User was created successfull",
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(401, "Token Has Expired");
      } else if (error.name === "JsonWebTokenError") {
        throw createError(401, "Invalid Token");
      } else {
        throw error;
      }
    }
  } catch (error) {
    next(error);
  }
};

// exports
module.exports = {
  allUsers,
  getUser,
  deleteUser,
  createUser,
  accountActivation,
};
