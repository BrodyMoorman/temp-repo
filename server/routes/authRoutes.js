const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, } = require('../controllers/authController');
const { listingFilter, newListing, getListing, getListingsByUser, newApplication, getApplication  } = require('../controllers/homeController');
const multer = require("multer");

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "../client/public/uploads");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
})
router.get("/", test);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/home", listingFilter);
router.post("/listing/new", newListing)
router.get("/listing/:id", getListing);
router.get("/listings/user/:id", getListingsByUser);
router.post("/application/new", newApplication);
router.get("/application/:id", getApplication);


module.exports = router;