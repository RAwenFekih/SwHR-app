const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10, // max connections
  host: "localhost",
  user: "root",
  password: "",
  database: "swrh",
});

module.exports = pool;
