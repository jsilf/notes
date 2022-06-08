const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const mysql = require("mysql2");

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");

const app = express();

app.locals.con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "notes",
  password: "3$ADBt]#8@$3PtG",
  database: "notes",
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

module.exports = app;
