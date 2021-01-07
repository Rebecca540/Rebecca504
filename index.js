// modules
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

// variables
const dbLink = process.env.DLINK
const port = process.env.PORT
const userRoute = require('./src/routes/userRoute')

// database connection
mongoose.connect(dbLink, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true,
  useFindAndModify: false
  
}, () => {
  app.listen(port, () => {
    console.info('DATABASE CONNECTED, SERVER IS UP!')
  })
})

// middlewares
app.use(express.json())

// routes
app.use(userRoute)


app.get('/', (req, res) => {
  res.status(200).send('<h1> Hei you, you dey town </h1>')
})