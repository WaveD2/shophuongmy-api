const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./src/Routers");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("./passport");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.json());

routes(app);

app.get("*", (req, res) => {
  res.send("Nhập Sai Đường Dẫn! Vui Lòng Nhập Lại >.<");
});

mongoose
  .connect(`${process.env.MONGO_DB || "mongodb://localhost:27017/Tiki"}`)
  .then(() => {
    console.log("Connect Db success!");
  })
  .catch((err) => {
    console.log("Lỗi kết db");
  });
app.listen(port, () => {
  console.log("Server is running in port: ", +port);
});
