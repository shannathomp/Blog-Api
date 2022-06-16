const express = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../Models/userSchema')

const router = express.Router()

//* User Login
router.post('/',[
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Check your password!").notEmpty()
] , async (req, res) => {
    const userData = req.body


    try {
        const user = await UserModel.findOne({email: userData.email})

        if (!user){
            return res.json('User not found!')
        }

     
        const isMatch = await bcrypt.compare(userData.password, user.password)

        if (!isMatch){
            return res.json('Password is not a match!')
        }


       const payload = {
        id: user._id,
        email: user.email
    }

    const TOKEN = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2 Days"})

    res.status(201).json({
        user: user,
        token: TOKEN
    })

    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error')
    }



})





module.exports = router