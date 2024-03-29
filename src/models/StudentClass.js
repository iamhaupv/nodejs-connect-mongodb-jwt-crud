const mongoose = require("mongoose");
const {Schema, ObjectId} = require("mongoose")
const studentClassSchema = (StudentClass = mongoose.model(
  "StudentClass",
  new Schema({
    id: {
      type: ObjectId,
    },
    name: {
      type: String,
      required: true,
      validate: {
        validator: () => this.name.length > 3,
        message: "Class must be at least 4 characters",
      },
    },
  })
));

module.exports = studentClassSchema;
