const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});
UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
  },
});
module.exports = mongoose.model("User", UserSchema);
