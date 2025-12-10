const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Create appointment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { doctor_id, date_time, reason } = req.body;
    const patient_id = req.user.id;
    const [conflict] = await pool.query('SELECT id FROM appointments WHERE doctor_id = ? AND date_time = ?', [doctor_id, date_time]);
    if (conflict.length) return res.status(400).json({ message: 'Slot occupied' });
    const [result] = await pool.query('INSERT INTO appointments (doctor_id, patient_id, date_time, reason, status) VALUES (?,?,?,?,?)', [doctor_id, patient_id, date_time, reason || '', 'scheduled']);
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
});

// Cancel appointment
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query('UPDATE appointments SET status = ? WHERE id = ?', ['cancelled', id]);
    res.json({ message: 'Cancelled' });
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
});

// List appointments for user
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const [rows] = await pool.query('SELECT a.*, u.name as doctor_name FROM appointments a LEFT JOIN users u ON a.doctor_id = u.id WHERE a.patient_id = ?', [user.id]);
    res.json(rows);
  } catch (err) {
    console.error(err); res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
