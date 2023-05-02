

const express=require('express')

const { userRouter } = require('./routes/users.routes')
const { postRouter } = require('./routes/post.routes')
const { connection } = require('./db')
const { auth } = require('./middleware/Authmiddleware')
const cors = require('cors')


const app=express()
app.use(cors())
app.use(express.json())
require('dotenv').config()


app.use("/users",userRouter)

app.use(auth)
app.use("/posts",postRouter)

app.get("/",(req,res)=>{
    res.send('wellcome to socialmedia app')
})


app.listen(process.env.port,async()=>{
    console.log('server is running on port 9090')

    try {
        await connection
        console.log("server gets connected with DB")
    } catch (error) {
        console.log("error in running thr server")
    }
})

module.exports= app
