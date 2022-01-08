// DEPENDENCIES

// get .env variables
require('dotenv').config();

// pull PORT and DATABASE_URL
const { PORT = 3001, DATABASE_URL } = process.env; //const PORT = process.env || 3001


// import express
const express = require('express');

// create app object
const app = express();

// import mongoose
const mongoose = require('mongoose');

// import middleware
const cors = require('cors'); // cross origin resource share. allows servers to share resources
const morgan = require('morgan'); // server action logger

// DATABASE CONNECTION

// Establish Connection
mongoose.connect(DATABASE_URL)

// Connection Events
mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(error))

// MODELS
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
  })
  
  const People = mongoose.model('People', PeopleSchema)

// MIDDLEWARE
app.use(cors()) // to prevent cors errors, open access to all origins
app.use(morgan('dev')) // logging
app.use(express.json()) // parse json bodies

// ROUTES

// create test route
app.get('/', (req, res) => {
    res.send('hello world');
});

// INDEX ROUTE
app.get('/people', async (req, res) => {
    try {
      // send all people
      res.json(await People.find({}))
    } catch (error) {
      //send error
      res.status(400).json(error)
    }
  })
  
 // CREATE ROUTE
 app.post('/people', async (req, res) => {
   try {
     // send all people
     res.json(await People.create(req.body))
   } catch (error) {
     //send error
     res.status(400).json(error)
   }
 })

// DELETE ROUTE
app.delete('/people/:id', async (req, res) => {
    try {
      // send all people
      res.json(await People.findByIdAndDelete(req.params.id))
    } catch (error) {
      //send error
      res.status(400).json(error)
    }
  })

// UPDATE ROUTE
app.put('/people/:id', async (req, res) => {
    try {
      // send all people
      res.json(await People.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch (error) {
      //send error
      res.status(400).json(error)
    }
  })


// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))
