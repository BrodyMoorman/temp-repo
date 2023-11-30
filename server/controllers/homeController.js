const { json } = require("express");
const Listing = require("../models/listingsSchema");
const Application = require("../models/applicationsSchema");

const listingFilter = async (req, res) => {
    try {
        console.log(req.body);
        let animal = req.body.query.animal || "all";
        let gender = req.body.query.gender || "all";
        let age = req.body.query.age || "all";
        let fee = parseInt(req.body.query.fee);
        let search = req.body.query.search || "";

        const animalOptions = [
            "dog",
            "cat",
            "bird",
            "fish",
            "reptile",
            "other",
        ]; 

        const genderOptions = [
            "male",
            "female", 
        ];

        // age needa to be added to the database
        const ageOptions = [
            "Baby",
            "Young",
            "Adult",
            "Senior",
        ];


        animal === "all"
            ? (animal = [...animalOptions])
            : (animal = req.body.query.animal.split(","))


        gender === "all" 
            ? (gender = [...genderOptions])
            : (gender = req.body.query.gender.split(","));

        
        age === "all" 
            ? (age = [...ageOptions])
            : (age = req.body.query.age.split(","));
        
        const petList = await Listing.find(
            {$and: [
                {"pet_name": { $regex: search, $options: "i" }},
                {"pet_species": {"$in": animal}},
                {"adoption_fee": {$lte: fee}},

                //these 2 need to be updated in database
                //{"gender": {"$in": gender}},
                {"pet_birthday": {"$in": age}}
            ]}
        )
        
        return res.json(petList);
        //res.json(animal);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
}
const newListing = async (req, res) => {
    try {
        const isFemale = (req.body.gender == "female")
        const listing = await Listing.collection.insertOne({
            owner_id: req.body.owner_id,
            owner_email: req.body.owner_email,
            owner_phone: req.body.owner_phone,
            pet_name: req.body.pet_name,
            pet_breed: req.body.pet_breed,
            pet_species: req.body.pet_species, 
            female: isFemale,
            pet_color: req.body.pet_color,
            pet_birthday: req.body.pet_age,
            pet_description: req.body.pet_description,
            vaccinated: req.body.vaccinated,
            adoption_fee: req.body.adoption_fee,
            image_url: req.body.images,
            zip_code: req.body.zip_code,
        });
        res.json(listing);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
}

const getListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        res.json(listing);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
}

const getListingsByUser = async (req, res) => {
    try {
        const listings = await Listing.find({ owner_id: req.params.id });
        res.json(listings);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
}

const newApplication = async (req, res) => {
    try {
        const application = await Application.collection.insertOne({
            listing_id: req.body.listing_id,
            user_id: req.body.user_id,
            contact_email: req.body.contact_email,
            contact_phone: req.body.contact_phone,
            message: req.body.message,
        });

        // add application to listing applications array
        const listing = await Listing.findById(req.body.listing_id);
        listing.applications.push(application.insertedId);
        await listing.save();

        res.json(application);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
}

const getApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        res.json(application);
    } catch (err) {
        console.log(err);
        res.json(err);
    }
}



module.exports = {
    listingFilter,
    newListing,
    getListing,
    getListingsByUser,
    newApplication,
    getApplication,
}