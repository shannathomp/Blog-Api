const express = require('express')
const UserModel = require('../models/usersSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

//* Create or Register a new User
router.post('/', [
    check('username', "Username is required from Middleware!").notEmpty(),
    check("email", "Please use a valid email! from middleware").isEmail(),
    check("password", "Please enter a password").notEmpty(),
    check("password", "Please enter a password with six or more characters").isLength({min: 6}),
] ,async (req, res) => {
    const userData = req.body
    try {
    
        const userExist = await UserModel.findOne({email: userData.email})
        if (userExist) {
            return res.json({msg: "You already exist!"})
        }


        const SALT = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(userData.password, SALT)
        userData.password = hashedPassword
        const user = await UserModel.create(userData)


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
        console.log(error)
        res.status(400).json('Bad request!!!!!')
    }
})

module.exports = router