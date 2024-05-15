const Message = require("../models/Message");
const CustomError = require("../utils/CustomError");

exports.sendMessage = async ({ message, senderId, receiverId }) => {
  const newMessage = new Message({
    senderId: senderId,
    receiverId: receiverId,
    message: message,
  });

  await newMessage.save();

  return newMessage.populate({
    path: "senderId receiverId",
    model: "User",
  });
};
