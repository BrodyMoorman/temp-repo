const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv').config();
const {mongoose} = require('mongoose');
const cookieParser = require('cookie-parser')
const app = express();
const multer = require("multer");


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database not connected', err))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))



app.use('/api', require('./routes/authRoutes'))


const port = 8000;
app.listen(port, () => console.log(`server is running on port ${port}`))