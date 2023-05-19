const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://assignment-11-user:bD7X9aqwkDd7UEEw@cluster0.1wn0xld.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//assignment-11-user
//bD7X9aqwkDd7UEEw

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toyCollection = client.db('assignment-11').collection('toys');



  app.post('/addToy', async (req, res) => {
    const toy = req.body;
    console.log(toy);
    const result = await toyCollection.insertOne(toy);
    res.send(result);
  });

  app.get('/myToys', async (req, res) => {
    query = { seller_email: req.query.email }
    const result = await toyCollection.find(query).toArray();
    res.send(result);
  })

  app.get('/allToys20', async (req, res) => {
    const cursor = toyCollection.find().limit(20);
    const result = await cursor.toArray();
    res.send(result);
  })

  app.get('/allToys', async (req, res) => {
    const cursor = toyCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  })

  //   app.get('/myAllToys/:email', async (req, res) => {
  //     const email = req.params.email;
  //     const query = { seller_email: email }
  //     const result = await toyCollection.find(query).toArray();
  //     res.send(result);
  // })

  app.get('/toy/edit/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await toyCollection.findOne(query);
    res.send(result);
  })  

app.patch('/toy/update', async (req, res) => {
  
  const updateToy = req.body;
  const id = updateToy.id;
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
      $set: {
          name: updateToy.name,
          category: updateToy.category,
          photoUrl: updateToy.photoUrl,
          description: updateToy.description,
          price: updateToy.price,
          rating: updateToy.rating,
          seller: updateToy.seller,
          seller_phone: updateToy.seller_phone,
          seller_email: updateToy.seller_email,
      },
  };
  const result = await toyCollection.updateOne(filter, updateDoc);
  res.send(result);
})

app.delete('/toy/delete/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const result = await toyCollection.deleteOne(query);
  res.send(result);
})


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
