const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

function generateUUID() {
    return crypto.randomUUID();
}

router.post('/', async (req, res) => {
    console.log('Incoming request:', JSON.stringify(req.body, null, 2));

    try {
        // Destructure and validate required fields
        const { user_id, doc_type, doc_name, file_path = '' } = req.body;

        // Validate required fields
        const missingFields = [];
        if (!user_id) missingFields.push('user_id');
        if (!doc_type) missingFields.push('doc_type');
        if (!doc_name) missingFields.push('doc_name');
        if (!file_path) missingFields.push('file_path');

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: 'Missing required fields',
                missingFields,
                received: Object.keys(req.body)
            });
        }

        // Check user exists and get vacation days
        console.log(`Querying user: ${user_id?.trim()}`);

        const sql = `SELECT user_id FROM users WHERE user_id = ?`;

        const userRows = await new Promise((resolve, reject) => {
            db.query(sql, [user_id], (err, result) => {
                if (err) {
                    return reject(err);
                }

                if (result.length === 0) {
                    return reject(new Error("User not found"));
                }

                resolve(result[0]); // Return first user object
            });
        });

        console.log("test value", userRows);


        if (!userRows || userRows.length === 0) {
            console.error(`User not found: ${user_id}`);
            return res.status(404).json({
                error: 'User not found',
                provided_user_id: user_id
            });
        }

        console.log("1", userRows)
        console.log(userRows[0])
        const user = userRows;
        console.log(`Found user ${user.user_id}`);

        // Generate UUID for request_id
        const document_id = generateUUID();
        const upload_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Prepare and log insert query
        const insertQuery = `
      INSERT INTO documents 
      (document_id, user_id, doc_type, doc_name, file_path, 
       upload_date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
        const insertParams = [
            document_id,
            user_id,
            doc_type,
            doc_name,
            file_path,
            upload_date,
        ];

        console.log('Executing insert query:', { query: insertQuery, params: insertParams });

        // Execute insert query
        const insertResult = await db.query(insertQuery, insertParams);
        console.log('Insert result:', insertResult);


        // Return success response
        const response = {
            success: true,
            document_id,
            doc_name,
            details: {
                user_id,
                doc_type,
                file_path,
                upload_date
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

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const rows = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM documents WHERE user_id = ?', [userId], (err, result) => {
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