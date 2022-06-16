// PART ONE - Create your Server & Routers:
//     - Server
//         - Mongo Connected
//         - Middleware
//         - Routes Connected
//     - Routes
//         - /auth
//         - /blogs

const express = require('express')
const authrouter = require('./routes/authrouter')
const blogrouter = require('./routes/blogrouter')
const mongoConfig = require('./Config/mongoConfig')
const userRouter = require('./routes/userRouter')
const morgan = require('morgan')
const helmet = require('helmet')
require('dotenv').config()
const app = express()


app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
const port = 3000

app.use('/blogpost', blogrouter)
app.use('/user', userRouter )

app.get('/',(req,res) => {
    // res.status(200).json()
    res.send('<h1>Welcome To Shanna\'s Finance Blog!!!</h1>')
})

app.listen(port, ()=> {
    console.log(`we running on port ${port}.....`);
    mongoConfig()
})