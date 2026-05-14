const express = require('express')
const router = express.Router()
const pool = require('../db')

// GET all notes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notes ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST create a note
router.post('/', async (req, res) => {
  const { title, content } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('POST error:', err)
    res.status(500).json({ error: err.message })
  }
})

// PUT update a note
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body
  try {
    const result = await pool.query(
      'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE a note
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM notes WHERE id = $1', [id])
    res.json({ message: 'Note deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router