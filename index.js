const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = 3000;

console.log(process.env.DB_HOST);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected...");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/adduser", (req, res) => {
  const { email, password, role } = req.body;
  const query = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";

  db.query(query, [email, password, role], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("User added successfully");
  });
});

app.post("/checkuser", (req, res) => {
  const { email, password } = req.body;
  const query =
    "SELECT email, password, role FROM users WHERE email = ? AND password = ?";

  db.query(query, [email, password], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length > 0) {
      res.json({
        access: true,
        email: result[0].email,
        role: result[0].role,
      });
    } else {
      res.json({
        access: false,
        message: "User does not exist",
      });
    }
  });
});

app.get("/getoptions", (req, res) => {
  const query = "SELECT * FROM tech_stack_options";

  db.query(query, [], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(result);
  });
});

app.get("/getchanges/:template_id", (req, res) => {
  const templateId = parseInt(req.params.template_id);

  const query = "SELECT * FROM changes WHERE template_id = ?";

  db.query(query, [templateId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(result);
  });
});

app.delete("/commitchanges/:id", (req, res) => {
  const changeId = parseInt(req.params.id);

  const query = "DELETE FROM newhire_changes WHERE id = ?";

  db.query(query, [changeId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ message: "Change committed successfully", result });
  });
});

app.delete("/deletechanges/:id", (req, res) => {
  const changeId = parseInt(req.params.id);

  const query = "DELETE FROM newhire_changes WHERE id = ?";

  db.query(query, [changeId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ message: "Change committed successfully", result });
  });
});

app.post("/savechanges", (req, res) => {
  const {
    template_id,
    changed_platform,
    changed_link,
    changed_instruction,
    changed_hyper_text,
  } = req.body;

  const query = `
    INSERT INTO NewHire_Changes (template_id, changed_platform, changed_link, changed_instruction, changed_hyper_text)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      template_id,
      changed_platform,
      changed_link,
      changed_instruction,
      changed_hyper_text,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json({ message: "Change saved successfully", result });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
