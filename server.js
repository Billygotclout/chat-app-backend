const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const dbconnection = require("./config/dbconnection");
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

dbconnection();
app.get("/", (req, res) => {
  res.send("API is Running");
});

app.use("/api/auth", require("./routes/user.routes"));
app.use("/api/message", require("./routes/message.routes"));
app.listen(PORT, () => {
  console.log(`Server is listening on port http://locahost:${PORT}`);
});
