const express = require('express')
const app = express()
const cors = require('cors')
require("dotenv").config();
const port = process.env.PORT || 4000

// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello from Spice of Life!')
})



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.iw4kl2c.mongodb.net/?retryWrites=true&w=majority`;

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

        const spiceOfLifeDB = client.db('spiceOfLifeDB')
        const chefCollection = spiceOfLifeDB.collection('chefCollection')

        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // for chef data
        app.get('/chefs', async(req, res) => {
            const result = await chefCollection.find().toArray()
            res.send(result)
        })
        app.get('/chef/:id', async(req, res) => {
            const uniqueId = req.params.id
            const result = await chefCollection.findOne({_id: new ObjectId(uniqueId)})
            res.send(result)
        })
        
        
        // for recipe by category
        app.get('/getRecipesByCategory', async(req, res) => {
            const category = req.query.category

            const recipes = []
            const chefs = await chefCollection.find({}).toArray()

            for(const chef of chefs){
                for(const recipe of chef.recipes){
                    if(recipe?.category === category){
                        recipes.push(recipe)
                    }
                }
            }

            res.send(recipes)

        })
        



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