const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const chefData = require('./chefsData/chefs.json')
const port = 4000

app.get('/', (req, res)=>{
    res.send('hello from Spice of Life!')
})

// for chef data
app.get('/chefs', (req,res)=>{
    res.send(chefData)
})
app.get('/chef/:id', (req,res)=>{
    const unique = req.params.id
    const chef = chefData.find(chef=> parseInt(chef.id) === parseInt(unique))
    res.send(chef)
})


// for testing the server
app.listen(port, ()=>{
    console.log('Spice of Life server is running');
})