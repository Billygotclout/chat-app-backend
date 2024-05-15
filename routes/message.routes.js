const express = require("express");

const validateToken = require("../middleware/authentication.middleware");
const { sendMessage } = require("../controllers/messages.controller");
const router = express.Router();

router.use(validateToken);
router.route("/send-message").post(sendMessage);
module.exports = router;
