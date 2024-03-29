const { validationResult } = require("express-validator");
const { userRepository } = require("../repositories/index");
const { EventEmitter } = require("node:events");
//
// event
const myEvent = new EventEmitter();
// listen event
myEvent.on("event.register.user", (params) => {
  console.log(`${JSON.stringify(params)}`);
});
//
const login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { email, password } = req.body;
  try {
    let existUser = await userRepository.login({ email, password });
    res.status(200).json({
      message: "Login success",
      data: existUser
    });
  } catch (error) {
    res.status(500).send("Wrong email or password");
  }
  // call repositories
};

const register = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;
  // even emitter
  myEvent.emit("event.register.user", {
    name,
    email,
    password,
    phoneNumber,
    address,
  });
  try {
    const user = await userRepository.register({
      name,
      email,
      password,
      phoneNumber,
      address,
    });
    res.status(200).json({
      message: "Register Successfully!",
      data: user,
    });
  } catch (exception) {
    console.log(exception);
    res.status(500).send("Internal Server Error!");
  }
};

const getDetailUser = async (req, res) => {};

module.exports = {
  login,
  register,
  getDetailUser,
};
