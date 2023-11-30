const mongoose = require("mongoose");
const {Schema} = mongoose;


const usersSchema = new Schema({
    password: String,
    email: String,
    first_name: String,
    last_name: String,
    is_verified: Boolean,
    verification_token: String,
})


const User = mongoose.model("User" , usersSchema, "Users")


module.exports = User;