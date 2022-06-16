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




router.post('/',middleware, async (req, res) => {
    const userData = req.body
    try {
      const user = await UserModel.create(userData)
      res.status(200).json(user)  
    } catch (error) {
        res.status(400).json('You already created one')
    }
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