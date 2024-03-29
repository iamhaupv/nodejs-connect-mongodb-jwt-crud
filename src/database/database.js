const mongoose = require("mongoose");
const {print, OutputType} = require("../helpers/print");
const Exception  = require("../exceptions/Exception");
//
mongoose.set("strictQuery", true)
async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URL);
    print("Connect successfuly!", OutputType.SUCCESS)
    return connection;
  } catch (error) {
    const{code} = error
    if(!error.code == 8000){
        throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD)
    }else if(code == "ENOTFOUND"){
        throw new Exception(Exception.WRONG_CONNECTION_STRING)
    }
    throw new Exception(Exception.CANNOT_CONNECT_MONGOOSE)
  }
}
module.exports = connect;
