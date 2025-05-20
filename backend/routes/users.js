const express = require('express');
const router = express.Router();
const db = require('../db');

router.get("/:id", (req, res) => {
  const userId = req.params.id;

  const sql = `
    SELECT user_id, name, email, age, nationality, role, 
           total_vacation_days, vacation_days_left, year
    FROM users WHERE user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result[0]); // Return user object
  });
});
module.exports = router;
