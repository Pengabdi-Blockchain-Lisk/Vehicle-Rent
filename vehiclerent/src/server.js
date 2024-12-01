const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost', // Replace with your database host
  user: 'root',      // Replace with your database user
  password: '',      // Replace with your database password
  database: 'mydatabase' // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Route to get data
app.get('/data', (req, res) => {
  const sql = 'SELECT * FROM mytable'; // Replace with your table name
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Route to insert data
app.post('/data', (req, res) => {
  const { mobil, lokasi, pax, harga } = req.body;
  const sql = 'INSERT INTO mytable (mobil, lokasi, pax, harga) VALUES (?, ?, ?, ?)';
  db.query(sql, [mobil, lokasi, pax, harga], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'Data added successfully', id: results.insertId });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
