const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

function generateUUID() {
    return crypto.randomUUID();
}

// Helper: Count weekdays (exclude Sat/Sun)
function countWeekdays(start, end) {
    let count = 0;
    const current = new Date(start);
    const endDate = new Date(end);

    while (current <= endDate) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) count++;
        current.setDate(current.getDate() + 1);
    }
    return count;
}


router.post('/', async (req, res) => {
    console.log('Incoming request:', JSON.stringify(req.body, null, 2));

    try {
        // Destructure and validate required fields
        const { user_id, leave_type, start_date, end_date, description = '' } = req.body;

        // Validate required fields
        const missingFields = [];
        if (!user_id) missingFields.push('user_id');
        if (!leave_type) missingFields.push('leave_type');
        if (!start_date) missingFields.push('start_date');
        if (!end_date) missingFields.push('end_date');

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: 'Missing required fields',
                missingFields,
                received: Object.keys(req.body)
            });
        }

        // Validate leave_type enum
        const validLeaveTypes = ['vacation', 'wedding', 'child_born', 'relatives_death'];
        if (!validLeaveTypes.includes(leave_type)) {
            return res.status(400).json({
                error: 'Invalid leave_type',
                valid_types: validLeaveTypes,
                received: leave_type
            });
        }

        // Validate date formats and logic
        const startDateObj = new Date(start_date);
        const endDateObj = new Date(end_date);

        if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
            return res.status(400).json({
                error: 'Invalid date format',
                expected_format: 'YYYY-MM-DD',
                received: { start_date, end_date }
            });
        }

        if (startDateObj > endDateObj) {
            return res.status(400).json({
                error: 'Invalid date range',
                message: 'Start date must be before end date',
                received: { start_date, end_date }
            });
        }

        // Calculate business days
        const daysRequested = countWeekdays(start_date, end_date);
        console.log(`Calculated ${daysRequested} business days`);

        // Check user exists and get vacation days
        console.log(`Querying user: ${user_id?.trim()}`);

        const sql = `SELECT user_id, vacation_days_left FROM users WHERE user_id = ?`;

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
        console.log(`Found user ${user.user_id} with ${user.vacation_days_left} days left`);

        // Validate sufficient vacation days
        if (daysRequested > user.vacation_days_left) {
            return res.status(400).json({
                error: 'Insufficient vacation days',
                details: {
                    requested: daysRequested,
                    available: user.vacation_days_left,
                    deficit: daysRequested - user.vacation_days_left
                }
            });
        }

        // Generate UUID for request_id
        const requestId = generateUUID();
        const requestDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Prepare and log insert query
        const insertQuery = `
      INSERT INTO leaverequests 
      (request_id, user_id, leave_type, start_date, end_date, 
       status, request_date, days_requested, description)
      VALUES (?, ?, ?, ?, ?, 'pending', ?, ?, ?)
    `;
        const insertParams = [
            requestId,
            user_id,
            leave_type,
            start_date,
            end_date,
            requestDate,
            daysRequested,
            description
        ];

        console.log('Executing insert query:', { query: insertQuery, params: insertParams });

        // Execute insert query
        const insertResult = await db.query(insertQuery, insertParams);
        console.log('Insert result:', insertResult);

        // Update user's vacation days
        /*const newVacationDays = user.vacation_days_left - daysRequested;
        await db.query(
            'UPDATE users SET vacation_days_left = ? WHERE user_id = ?',
            [newVacationDays, user_id]
        );
        console.log(`Updated user ${user_id} vacation days to ${newVacationDays}`);*/

        // Return success response
        const response = {
            success: true,
            requestId,
            daysRequested,
            /*remainingDays: newVacationDays,*/
            details: {
                leave_type,
                start_date,
                end_date,
                description
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
            db.query('SELECT * FROM leaverequests WHERE user_id = ?', [userId], (err, result) => {
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