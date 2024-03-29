const {print, OutputType} = require("../helpers/print")
module.exports = class Exception extends Error{
    static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password"
    static WRONG_CONNECTION_STRING = "Wrong server name/connection string"
    static CANNOT_CONNECT_MONGOOSE = "Cannot connect to Mongoose"
    static USER_EXIST = "User already exist"
    static CANNOT_REGISTER_UER = "Cannot register user"
    static WRONG_EMAIL_OR_PASSWORD = "Wrong email or password!"
    constructor(message, validationErros={}){
        super(message)
        print(message, OutputType.ERROR)
        this.validationErros = validationErros
    }
}