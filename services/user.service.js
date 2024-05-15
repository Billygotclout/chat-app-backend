const User = require("../models/User");
const CustomError = require("../utils/CustomError");
const bcrypt = require("bcrypt");
exports.register = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (user) {
    throw new CustomError("User already exists, please login", 400);
  }
  const newUser = new User({
    username,
  });
  const hashedPassword = await bcrypt.hash(password, 10);
  newUser.password = hashedPassword;
  await newUser.save();

  return newUser;
};
exports.login = async ({ username, password }) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new CustomError("User does not exist, please register", 404);
  }
  const correctLogin =
    user.username && (await bcrypt.compare(password, user.password));
  if (!correctLogin) {
    throw new CustomError("Invalid Username or Password ", 400);
  }
  return user;
};
