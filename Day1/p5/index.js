const express = require('express')

const app = express()
app.use(express.json())



app.get('/', (req,res) => {
    res.send('Hello World')
})


app.listen(9090, (req,res) => {
    
})
