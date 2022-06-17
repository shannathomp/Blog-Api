const express = require('express')
const UserModel = require('../Models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()
const middleware = require('../Middleware/authmiddleware')


router.get('/', middleware, async (req,res) => {
 
    try {
       const users = await UserModel.find()
       res.status(200).json(users)
    } catch (error) {
      console.log(error);
    }
  })

  router.get('/:id', middleware, async (req,res) => {
    const id = req.params.id

    try {
      const user = await UserModel.findById(id)
      res.status(200).json(user)  
    } catch (error) {
        console.error(error);
    }
})




router.post('/', async (req, res) => {
    const userData = req.body
    try {
      const user = await UserModel.create(userData)
      res.status(200).json(user)  
    } catch (error) {
        res.status(400).json('You already created one')
    }

     //* ==== Create New User
        // 1 Create the salt
        const SALT = await bcrypt.genSalt(12)
        // 2 use the salt to create a hash with the user's password
        const hashedPassword = await bcrypt.hash(userData.password, SALT)
        // 3 assign the hashed password to the userData
        userData.password = hashedPassword
        // Write the user to the db
        const user = await UserModel.create(userData)

        //* create a new JWT Token

        const payload = {
            id: user._id,
            email: user.email
        }

        const TOKEN = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2 Days"})

        res.status(201).json({
            user: user,
            token: TOKEN
        })
        
})

router.delete('/:id', middleware, async (req,res) => {
  const id =req.params.id
  try {
      const user = await UserModel.findByIdAndDelete(id)
      res.status(204).json(user)
  } catch (error) {
     console.error(error); 
  }
 })

module.exports = router


