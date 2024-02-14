const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3456;

// MySQL configuration
const dbConfig = {
  host: '3.39.21.54',
  user: 'mr',
  password: '1',
  database: 'DB',
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, this is the Node.js server!');
});

app.post('/insertData', (req, res) => {
    const id = req.body.id;
    const num = req.body.num;

  // Insert data into the database
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting MySQL connection:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const query = `INSERT INTO example (id, num) VALUES ('${id}', '${num}')`;
    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).send('Internal Server Error');
        return;
      }

      console.log('Data inserted successfully');
      res.send('Success!');
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
