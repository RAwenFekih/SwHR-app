const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

function generateUUID() {
    return crypto.randomUUID();
}

router.get("/:id", (req, res) => {
  const userId = req.params.id;

  const sql = `
    SELECT user_id, name, email, age, nationality, role, 
           total_vacation_days, vacation_days_left, year, sex
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

router.post('/', async (req, res) => {
    console.log('Incoming request:', JSON.stringify(req.body, null, 2));

    try {
        console.log("Hellllo");
        
        // Destructure and validate required fields
        const { name, email, age, nationality, sex, role, passHash } = req.body;
        console.log(' request:', JSON.stringify(req.body, null, 2));

        // Validate required fields
        const missingFields = [];
        if (!name) missingFields.push('name');
        if (!email) missingFields.push('email');
        if (!age) missingFields.push('age');
        if (!nationality) missingFields.push('nationality');
        if (!sex) missingFields.push('sex');
        if (!role) missingFields.push('role');
        if (!passHash) missingFields.push('passHash');

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: 'Missing required fields',
                missingFields,
                received: Object.keys(req.body)
            });
        }
        console.log("Hellllo2");
        // Validate role enum
        const validroleTypes = ['admin', 'hr', 'employee'];
        if (!validroleTypes.includes(role)) {
            return res.status(400).json({
                error: 'Invalid leave_type',
                role: validroleTypes,
                received: role
            });
        }
        
        // Generate UUID for user_id
        const userId = generateUUID();

        // Prepare and log insert query
        const insertQuery = `
      INSERT INTO users 
      (user_id, name, email, age, nationality, role, total_vacation_days, 
      vacation_days_left, year, passHash, sex)
      VALUES (?, ?, ?, ?, ?, ?, 30, 30, 2025, ?, ?)
    `;
        const insertParams = [
            userId,
            name,
            email,
            age,
            nationality,
            role,
            passHash,
            sex
        ];

        console.log('Executing insert query:', { query: insertQuery, params: insertParams });

        // Execute insert query
        const insertResult = await db.query(insertQuery, insertParams);
        console.log('Insert result:', insertResult);

        // Return success response
        const response = {
            success: true,
            userId,
            name,
            email,
            details: {
                age,
                nationality,
                role,
                sex
            }
        };

        console.log('Success response:', response);
        res.status(201).json(response);

    } catch (err) {
        console.error('FULL ERROR DETAILS:', {
            message: err.message,
            stack: err.stack,
            timestamp: new Date().toISOString(),
            requestBody: req.body
        });

        res.status(500).json({
            error: 'Internal Server Error',
            requestId: generateUUID(), // Generate error ID for tracking
            timestamp: new Date().toISOString(),
            ...(process.env.NODE_ENV !== 'production' && {
                details: err.message,
                stack: err.stack
            })
        });
    }
});

router.get('/all/all', async (req, res) => {
  try {
    const rows = await new Promise((resolve, reject) => {
      const query = `
        SELECT * 
        FROM users
      `;

      db.query(query, (err, result) => {
        if (err) {
          return reject(err);
        }

        if (!result || result.length === 0) {
          return reject(new Error("No users found in the database"));
        }

        resolve(result);
      });
    });

    res.json(rows);
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: err.message || "Failed to fetch users" });
  }
});

// Total Employees
router.get('/api/total-employees', (req, res) => {
  db.query('SELECT COUNT(*) AS total FROM users', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});

// Gender Distribution
router.get('/api/gender-distribution', (req, res) => {
  db.query(
    `SELECT 
      SUM(CASE WHEN sex = 'M' THEN 1 ELSE 0 END) AS male, 
      SUM(CASE WHEN sex = 'F' THEN 1 ELSE 0 END) AS female 
     FROM users`,
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result[0]);
    }
  );
});

// Age Distribution
router.get('/api/age-distribution', (req, res) => {
  db.query(
    `SELECT
      CASE 
        WHEN age BETWEEN 20 AND 30 THEN '20-30'
        WHEN age BETWEEN 31 AND 40 THEN '31-40'
        WHEN age BETWEEN 41 AND 50 THEN '41-50'
        WHEN age BETWEEN 51 AND 60 THEN '51-60'
        ELSE '61+'
      END AS age_group,
      COUNT(*) AS count
     FROM users
     GROUP BY age_group`,
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});

module.exports = router;
