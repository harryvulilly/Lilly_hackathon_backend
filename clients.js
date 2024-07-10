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
