const express = require('express')
const router = express.Router()
const userModel = require('./model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



router.get('/', (req,res) => {
    try{
    
     res.send("User's home page")
    }
    catch(err){
        console.log(err)
    }
})



router.post('/signup', async(req,res) =>{
    try{
      const {name, age, email, password} = req.body;
      const ifUserExist = await findOne({email})
      if(ifUserExist){
       return res.send("User exist already!")
      }

      const hashedPass = await bcrypt.hash(password, 8)
      const newUser = new userModel({name, age, email, password: hashedPass})
      await newUser.save()
      res.status(200).send('New User added successfully!!')
    }
    catch(err){
        console.log(err.message)
    }
})


router.post('/login', async(req,res) => {
    try{
     const {email, password} = req.body;
     const user = await userModel.findOne({email})

     if(!user || !(await bcrypt.compare(password, user.password))){
        res.status(400).send('Invalid email or password')
     }

     const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
     res.status(500).send(user, token)
    }
    catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
})


router.get('/user/:id', async(req,res) => {
    try{
     const userId = req.params.id
     const user = await userModel.findById({userId})
     if(!user) {
        res.status(400).send("User not found!")
     }

     res.status(200).send(user)
    }
    catch(err){
        console.log(err.message)
        res.status(500).send(err)
    }
})



router.put('/updateuser/:id', async(req,res) => {
    try{
      const userId = req.params.id;
      const {name, age, email} = req.body;
      const user = await findByIdAndUpdate (userId, {name, age, email}, {new: true})
      if(!user) {
        res.status(400).send('User not found')
      }
      res.status(200).send("User data updated successfully!!")
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})


router.delete('/deleteuser/:id', async(req,res) => {
    try{
    const userId = req.params.id;
    const user = await user.findByIdAndDelete(userId)
    if(!user){
        res.status(400).send('User not found!')
    }
    res.status(200).send('User deleted successfully!')
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
})
