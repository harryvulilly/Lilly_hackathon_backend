const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with MySQL username
  password: 'password', // replace with MySQL password
  database: 'mydb'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/adduser', (req, res) => {
  const { email, password, role } = req.body;
  const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
  
  db.query(query, [email, password, role], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('User added successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
