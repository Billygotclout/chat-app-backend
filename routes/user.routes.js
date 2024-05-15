const express = require("express");
const {
  signUpUser,
  loginUser,
  currentUser,
} = require("../controllers/user.controller");
const validateToken = require("../middleware/authentication.middleware");

const router = express.Router();
router.route("/").get((req, res) => {
  res.send("Users Route is running");
});
router.route("/register").post(signUpUser);
router.route("/login").post(loginUser);
router.route("/current-user").get(validateToken, currentUser);
module.exports = router;
