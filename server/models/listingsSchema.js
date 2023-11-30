const mongoose = require("mongoose");
const {Schema} = mongoose;

const listingsSchema = new Schema ({
    owner_id: String,
    owner_email: String,
    owner_phone: Number,
    pet_name: String,
    pet_breed: String,
    pet_species: String,
    female: Boolean,
    pet_color: String,
    pet_birthday: String,
    pet_weight: String,
    pet_description: String,
    vaccinated: Boolean,
    //this needs to be updated to dynamic array of strings to support multiple pictures
    image_url: [String],
    zip_code: Number,
    applications: [Schema.ObjectId],

});

const Listing = mongoose.model("Listing", listingsSchema, "Listings");

module.exports = Listing;