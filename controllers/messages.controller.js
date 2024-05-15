const messageService = require("../services/message.service");
const User = require("../models/User");
const pusher = require("../utils/pusher");
const sendMessage = async (req, res, next) => {
  try {
    const { receiverName } = req.body;

    const receiver = await User.findOne({ username: receiverName });
    const response = await messageService.sendMessage({
      senderId: req.user.id,
      message: req.body.message,
      receiverId: receiver.id,
    });
    pusher.trigger("chat", "message", response);
    res.json({
      message: "message successfully sent",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { sendMessage };
