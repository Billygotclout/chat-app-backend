const User = require("../models/User");
const userService = require("../services/user.service");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");
const signUpUser = async (req, res, next) => {
  try {
    const response = await userService.register({
      username: req.body.username,
      password: req.body.password,
    });

    res.status(201).json({
      message: "User created successfully",
      user: response,
    });
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const response = await userService.login({
      username: req.body.username,
      password: req.body.password,
    });

    const token = jwt.sign(
      {
        user: {
          email: response.email,
          password: response.password,
          id: response.id,
        },
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      message: "User successfully logged in",
      token: token,
      user: response,
    });
  } catch (error) {
    next(error);
  }
};
const currentUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new CustomError("No token provided", 400);
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      throw new CustomError("User doesn't exist", 404);
    }

    res.json({ message: "User Successfully fetched", data: user });
  } catch (error) {
    next(error);
  }
};
module.exports = { signUpUser, loginUser, currentUser };
