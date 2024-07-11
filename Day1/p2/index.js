const express = require('express')
const app = express()
const {connection} = require('./db.js')
app.use(express.json())
const {User} = require('./userSchema.js')



app.get('/', (req,res) => {
    try{
        console.log('Hello World!')
    }
    catch(err){
        console.log(err.message)
    }
})


app.post('/add', async(req,res) => {
    try{
        const {name, email} = req.body;
        const checkUserExist = User.findOne({email:email})
        if(checkUserExist){
            res.send('User already exist')
        }

        const newUser = new User({name, email})

        await newUser.save()
        res.status(200).send('New User Added Successfully')
    }
    catch(err){
        console.log(err.message)
    }
})


app.listen(9090, async (req,res) => {
    try{
        await connection
        console.log('Connected to the DB')
        console.log('Server is running on port 9090')
    }
    catch(err){
        console.log(err.message)
    }
})