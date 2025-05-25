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


module.exports = router;
