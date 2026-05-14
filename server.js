const express = require('express')
const dotenv = require('dotenv')
const pool = require('./db')

dotenv.config()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Notes API is running')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})