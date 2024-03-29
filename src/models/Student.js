const mongoose = require("mongoose");
const {Schema, ObjectId} = require("mongoose")
const isEmail = require( 'validator/lib/isEmail')
// const studentSchema = mongoose.model(
//   "Student",
//   new Schema({
//     id: {
//       type: ObjectId,
//     },
//     name: {
//       type: String,
//       required: true,
//       validate: {
//         validator: (name) => name.length > 3,
//         message: "Name must be at least 3 character",
//       },
//     },
//     email: {
//       type: String,
//       validate: {
//         validator: isEmail,
//         message: "Email is incorrect format",
//       },
//     },
//     languages: {
//       type: [String],
//     },
//     gender: {
//         type: String,
//         enum:{
//           values: ['Male', 'Female'],
//           message: '{VALUE} is not support'
//         },
//         required: true,
//       },      
//     phoneNumber: {
//       type: String,
//       required: true,
//       validate: {
//         validator: (phoneNumber) => phoneNumber.length > 5 && phoneNumber.length < 11,
//         message: "Phone number must be 10 character",
//       },
//     },
//     address: {
//       type: String,
//       required: false,
//     },
//     })
// );
const studentSchema = mongoose.model('Student', 
    new Schema({
        id: {type: ObjectId},
        name: { 
            type: String, 
            required: true,
            //model validation
            validate: {
                validator: (name) => name.length > 3,
                message: 'Name must be at least 3 characters'
            }        
        },
        email: {
            type: String, 
            validate: {
                validator: isEmail,
                message: 'Email is incorrect format'
            }
        },
        languages: {
            type: [String],//this is an array,         
        },
        gender: {
            type: String,         
            enum: {
                values: ['Male', 'Female'],
                message: '{VALUE} is not supported'
            },
            required: true,        
        },
        phoneNumber: { 
            type: String, 
            required: true,
            validate: {
                validator: (phoneNumber) => phoneNumber.length > 5 
                                && phoneNumber.length <= 50,
                message: 'Phone number must be at least 5 characters, max: 50'
            }        
        },
        address: { 
            type: String, 
            required: false,        
        },
    })
)

module.exports = studentSchema;
