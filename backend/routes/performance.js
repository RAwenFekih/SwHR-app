const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const rows = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM performance WHERE user_id = ?', [userId], (err, result) => {
                if (err) {
                    return reject(err);
                }

                if (result.length === 0) {
                    return reject(new Error("User not found"));
                }

                resolve(result); 
            });
        });
    res.json(rows);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

module.exports = router;