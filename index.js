const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;

//midleware
app.use(cors())
app.use(express.json())
//connect

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jmdh2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
    await client.connect();
   const serviceCollection = client.db("doctor-portal").collection('services')

   app.get('/service',async(req,res)=>{
       const query = {};
       const cursor = serviceCollection.find(query)
       const services = await cursor.toArray();
       res.send(services)
       
   })
    }
    finally{

    }

}
run().catch(console.dir);








app.get('/',(req,res)=>{
    res.send('runing the server')
})










app.listen(port,()=>{
    console.log(port,'app listing');
})