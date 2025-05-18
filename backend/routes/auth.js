const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password are required" });

  const checkUserSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserSql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length > 0) {
      const user = results[0];
      if (password !== user.passHash) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      return res.status(200).json({
        message: "User signed in successfully",
        user: { id: user.user_id, email: user.email, role: user.role },
      });
    } else {
      return res.status(401).json({ error: "User not found" });
    }
  });
});

module.exports = router;
