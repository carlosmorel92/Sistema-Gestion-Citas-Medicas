const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');

// Get all users (admin)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users');
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({message:'Server error'}); }
});

// Get user by id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({message:'Not found'});
    res.json(rows[0]);
  } catch (err) { console.error(err); res.status(500).json({message:'Server error'}); }
});

// Update user (partial)
router.put('/:id', async (req, res) => {
  try {
    const { name, role } = req.body;
    await pool.query('UPDATE users SET name = COALESCE(?, name), role = COALESCE(?, role) WHERE id = ?', [name, role, req.params.id]);
    res.json({ message: 'Updated' });
  } catch (err) { console.error(err); res.status(500).json({message:'Server error'}); }
});

module.exports = router;
