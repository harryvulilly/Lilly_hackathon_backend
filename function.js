// server.js

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
const port = 5000;

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

app.post("/addcustomizations", (req, res) => {
  const {
    platform_name,
    platform_link,
    platform_instruction,
    hyper_text,
    customization,
  } = req.body;

  const query = `
  INSERT INTO Tech_Stack_Options (platform_name, platform_link, platform_instruction, hyper_text, customization) VALUES (?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      platform_name,
      platform_link,
      platform_instruction,
      hyper_text,
      customization,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json({ message: "Change saved successfully", result });
    }
  );
});

app.post("/savetemplate", (req, res) => {
  const { newhire_id, tech_stack } = req.body;

  const query = `INSERT INTO Templates (newhire_id) VALUES (?)`;
  
  db.query(query, [newhire_id], (err, result) => {
    if (err) {
      res.status(500).send('There is an error saving the template');
      throw err;
    }
    const template_id = result.insertId;
    const techStackValues = tech_stack.map(stack => {
      return [template_id, stack.platform_name];
    });
  
    db.query('INSERT INTO Template_Tech_Stack (template_id, platform_name) VALUES ?', [techStackValues], (err, result) => {
      if (err) {
        res.status(500).send("Cannot save template options");
        throw err;
      }
      res.status(200).send("Template saved successfully!");
    });
  });
});

app.get("/gettemplate/:id", (req, res) => {
  const gettemplate = parseInt(req.params.id);

  const query = "SELECT id FROM Templates WHERE id = ? LIMIT 1";

  db.query(query, [gettemplate], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({message: "Template displayed successfully", result});
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// client.js

async function addUser(email, password, role) {
  try {
    const response = await fetch("http://localhost:5000/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function checkUser(email, password) {
  try {
    const response = await fetch("http://localhost:5000/checkuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.access) {
      console.log("User exists:", data);
    } else {
      console.log("No user found", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getOptions() {
  try {
    const response = await fetch("http://localhost:5000/getoptions");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getChanges(templateId) {
  try {
    const response = await fetch(`http://localhost:5000/getchanges/${templateId}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function commitChanges(changeId) {
  try {
    const response = await fetch(`http://localhost:5000/commitchanges/${changeId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function deleteChanges(changeId) {
  try {
    const response = await fetch(`http://localhost:5000/deletechanges/${changeId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function saveChanges(template_id, changed_platform, changed_link, changed_instruction, changed_hyper_text) {
  try {
    const response = await fetch("http://localhost:5000/savechanges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template_id,
        changed_platform,
        changed_link,
        changed_instruction,
        changed_hyper_text,
      }),
    });
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function addCustomizations(platform_name, platform_link, platform_instruction, hyper_text, customization) {
  try {
    const response = await fetch("http://localhost:5000/addcustomizations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        platform_name,
        platform_link,
        platform_instruction,
        hyper_text,
        customization,
      }),
    });
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function saveTemplate(newhire_id, tech_stack) {
  try {
    const response = await fetch("http://localhost:5000/savetemplate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newhire_id, tech_stack }),
    });
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getTemplate(id) {
  try {
    const response = await fetch(`http://localhost:5000/gettemplate/${id}`);
    const data = await response.json();
    console.log(data.message, data.result);
  } catch (error) {
    console.error("Error:", error);
  }
}
