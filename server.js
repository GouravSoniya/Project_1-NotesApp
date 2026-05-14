const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const pool = require('./db')
const notesRouter = require('./routes/notes')


console.log(process.env.DATABASE_URL)
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Notes API is running')
})

const PORT = process.env.PORT || 3000

app.use('/api/notes', notesRouter)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

