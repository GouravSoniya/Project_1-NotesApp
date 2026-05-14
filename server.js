const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const pool = require('./db')
const notesRouter = require('./routes/notes')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 3000

app.use('/api/notes', notesRouter)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

