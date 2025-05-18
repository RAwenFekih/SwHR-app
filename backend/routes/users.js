const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT user_id, email, role FROM users WHERE user_id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
});

module.exports = router;
