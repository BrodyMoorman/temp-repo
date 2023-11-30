const User = require('../models/usersSchema') 
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken');
 
const test = (req, res) => {
   res.json('test is working')
}


const registerUser = async (req, res) => {
   try {
      const {first_name, last_name, email, password} = req.body
      // check if name was entered
      
      if (!password) {
         return res.json({
            error: 'Password is required'
         })
      };
      //check email
      const exist = await User.findOne({email});
      if (exist) {
         return res.json({
            error: 'Email is taken'
         })
      }

      const hashedPassword = await hashPassword(password)

      const user = await User.collection.insertOne({
         password: hashedPassword, 
         email: email, 
         first_name: first_name, 
         last_name: last_name,
         is_verified: false,
         verification_token: "",
      })
      
      return res.json(user)
   } catch (error) {
      console.log(error)
   }
};

const loginUser = async (req, res) => {
   try {
      const {email, password} = req.body;

      //check if user exists
      const user = await User.collection.findOne({email});
      if (!user) {
         return res.json({
            error: 'No user found'
         })
      }

      //check if password match
      const match = await comparePassword(password, user.password)
      if (match) {
         const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET)
         res.status(200).json({ token: token, user: user})
      }
      if (!match) {
         res.json({
            error: 'Passwords do not match'
         })
      }
   } catch (error) {
      console.log(error);
   }
}

module.exports = {
   test,
   registerUser,
   loginUser,
}