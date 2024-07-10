const checkUser = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3000/checkuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.access) {
      console.log('User exists:', data);
    } else {
      console.log('User does not exist:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
 
// Example usage:
checkUser('test@example.com');


const addUser = async (user) => {
    try {
      const response = await fetch('http://localhost:3000/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
   

  const newUser = {
    email: 'admin@lilly.com',
    password: 'admin',
    role: 'user'
  };
   
  addUser(newUser);