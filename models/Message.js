const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
