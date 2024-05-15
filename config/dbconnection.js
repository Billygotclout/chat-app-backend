const mongoose = require("mongoose");

const dbconnection = async (req, res, next) => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "Db connected: ",
      connect.connection.name,
      connect.connection.host
    );
  } catch (error) {
    next(error);
  }
};
module.exports = dbconnection;
