const express = require('express')
const router = express.Router()
const userModel = require('./model.js')


router.get('/', (req,res) => {
    try{
    
     res.send("User's home page")
    }
    catch(err){
        console.log(err)
    }
})



router.post('/adduser', async(req,res) =>{
    try{
      const {name, age, email} = req.body;
      const ifUserExist = await findOne({email})
      if(ifUserExist){
       return res.send("User exist already!")
      }
      const newUser = new userModel({name, age, email})
      await newUser.save()
      res.status(200).send('New User added successfully!!')
    }
    catch(err){
        console.log(err.message)
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
