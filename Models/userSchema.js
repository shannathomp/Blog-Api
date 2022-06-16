
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
   
    email: {
        type: String,
        required: true,
        unique: true
    },

    birthday: {
       date: Number,
    },

    age: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

    Created_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports =  mongoose.model('User', userSchema)
