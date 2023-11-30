const mongoose = require("mongoose");
const {Schema} = mongoose;

const applicationsSchema = new Schema({
    listing_id: Schema.ObjectId,
    user_id: Schema.ObjectId,
    contact_email: String,
    contact_phone: String,
    message: String,
})


const Application = mongoose.model("Application", applicationsSchema, "Applications")

module.exports = Application;
