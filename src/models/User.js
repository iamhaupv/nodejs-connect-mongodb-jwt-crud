const mongoose= require("mongoose");
const {Schema, ObjectId} = require("mongoose")
const isEmail = require( 'validator/lib/isEmail')


const userSchema = mongoose.model(
  "User",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true, // Không phải require mà là required
      validate: {
        validator: (value) => value.length > 3,
        message: "Username must be at least 3 characters"
      }
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: value => isEmail,
        message: "Email is incorrect form"
      }
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    }
  })
);

module.exports = userSchema