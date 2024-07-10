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