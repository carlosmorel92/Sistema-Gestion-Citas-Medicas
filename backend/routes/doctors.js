const express = require('express');
const router = express.Router();
const pool = require('../db');

// List doctors (users with role = 'doctor')
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, name, email, created_at FROM users WHERE role = 'doctor'"); 
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({message:'Server error'}); }
});

// Create doctor (admin)
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [exists] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (exists.length) return res.status(400).json({message:'Email exists'});
    const hash = await require('bcrypt').hash(password || 'defaultpass', 10);
    const [result] = await pool.query('INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)', [name,email,hash,'doctor']);
    res.json({ id: result.insertId });
  } catch (err) { console.error(err); res.status(500).json({message:'Server error'}); }
});

module.exports = router;
