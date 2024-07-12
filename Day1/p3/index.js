const express = require('express')
const app = express()
const {connection} = require('./db.js')
app.use(express.json())


app.get('/', (req,res) => {
    try{
    res.status(200).json('Hello World!')
    }
    catch(err){
        console.log(err.message)
    }
})


app.listen(9090, async() => {
    try{
        await connection
        console.log('Connected to Database successfully!!')
        console.log('Server running on port 9090')
    }
    catch(err){
        console.log(err.message)
    }
})


