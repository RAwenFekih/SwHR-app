const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const passwordResetHandler = require("./passwordReset");

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "platform",
});

app.get("/", (_re, res) => {
  return res.json("From BAckend Side");
});

app.get("/users", (_req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.use(express.json());

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Check if user exists
  const checkUserSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserSql, [email], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length > 0) {
      // User exists, for simplicity, just return success
      return res.status(200).json({ message: "User signed in successfully" });
    } else {
      // Insert new user
      const insertUserSql = "INSERT INTO users (email, password) VALUES (?, ?)";
      db.query(insertUserSql, [email, password], (err, _insertResult) => {
        if (err) return res.status(500).json(err);
        return res
          .status(201)
          .json({ message: "User registered and signed in successfully" });
      });
    }
  });
});

// Use password reset handler
app.post("/reset-password", passwordResetHandler(db));

app.listen(8081, () => {
  console.log("Listening ");
});
