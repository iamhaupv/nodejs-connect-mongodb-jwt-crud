const Exception = require("../exceptions/Exception");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
//
const login = async ({ email, password }) => {
  let existUser = await User.findOne({ email }).exec();
  if (existUser) {
    let isMatch = await bcrypt.compare(password, existUser.password);
    if (!!isMatch) {
      let token =  jwt.sign({
        data: existUser
      }, process.env.JWT_SECRET, {
        expiresIn: "10 days"
      })
      return {
        ...existUser.toObject(),
        token: token
      }
    } else {
      throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
  }
};

const register = async ({ name, email, password, phoneNumber, address }) => {
  try {
    const existUser = await User.findOne({ email }).exec();
    if (!!existUser) {
      throw new Exception(Exception.USER_EXIST);
    }
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });
    return newUser;
  } catch (error) {
    throw new Exception(Exception.CANNOT_REGISTER_UER);
  }
};

module.exports = {
  login,
  register,
};
