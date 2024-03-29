const express = require("express");
require("dotenv").config();
const app = express();
const { studentRouter, userRouter } = require("./src/routes/index");
const port = process.env.PORT;
const connect = require("./src/database/database");
const checkToken = require("./src/authentication/auth");
// config middleware
app.use(checkToken);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// config static files
app.use(express.static("./src"));
// router
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/users", userRouter);
app.use("/students", studentRouter);
// listen
app.listen(port, async () => {
  await connect();
  console.log(`Exmaple app on for port ${port}`);
});
