const express = require('express')
const app = express()
const cors = require('cors')
require("dotenv").config();
const chefData = require('./chefsData/chefs.json')
const port = process.env.PORT || 4000

// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello from Spice of Life!')
})

// for chef data
app.get('/chefs', (req, res) => {
    res.send(chefData)
})
app.get('/chef/:id', (req, res) => {
    const unique = req.params.id
    const chef = chefData.find(chef => parseInt(chef.id) === parseInt(unique))
    res.send(chef)
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://<${process.env.MONGODB_USER}>:<${process.env.MONGODB_PASS}>@cluster0.iw4kl2c.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



// for testing the server
app.listen(port, () => {
    console.log('Spice of Life server is running');
})