import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root123",
  database: "mernapp",
});

app.get('/', (req, res) => {
  res.end("Hello from Node.js");
});

app.get('/users', (req, res) => {
  const username = req.query.username;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const query = "SELECT task FROM tasks WHERE username = ?";
    connection.query(query, [username], (err, result, fields) => {
      connection.release();

      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      let text = "";
      let count = 1;

      for (const row of result) {
        text += `${count}.${row.task}\n`;
        count += 1;
      }

      const index = text.lastIndexOf("\n");
      text = text.substring(0, index);

      res.send(text);
    });
  });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const query = "SELECT password FROM user WHERE username = ?";
    connection.query(query, [username], (err, result, fields) => {
      connection.release();

      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (result.length > 0 && password === result[0].password) {
        res.redirect(`http://localhost:3000/users?username=${username}`);
      } else {
        res.redirect('http://localhost:3000/invalid');
      }
    });
  });
});

app.post('/createtask', (req, res) => {
  const task = req.body.newtask;
  const username = req.body.username;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const query = "INSERT INTO tasks VALUES (?, ?)";
    connection.query(query, [username, task], (err, result) => {
      connection.release();

      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.redirect(`http://localhost:3000/users?username=${username}`);
    });
  });
});

app.post('/createacc', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  if (password === confirmpassword) {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      const query = "INSERT INTO user VALUES (?, ?)";
      connection.query(query, [username, password], (err, result) => {
        connection.release();

        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
          return;
        }

        console.log("Inserted");
        res.redirect("http://localhost:3000/acccreated");
      });
    });
  }
});

app.post('/deletetask', (req, res) => {
  const task = req.body.task.substring(2);
  const username = req.body.username;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const query = "DELETE FROM tasks WHERE task = ?";
    connection.query(query, [task], (err, result) => {
      connection.release();

      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      console.log("Deleted");
      res.redirect(`http://localhost:3000/users?username=${username}`);
    });
  });
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
