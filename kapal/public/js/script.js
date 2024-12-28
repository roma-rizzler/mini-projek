let token = '';
let userRole = '';
let username = '';

function showRegister() {
  document.getElementById('login').style.display = 'none';
  document.getElementById('register').style.display = 'block';
}

function showLogin() {
  document.getElementById('register').style.display = 'none';
  document.getElementById('login').style.display = 'block';
}

function login() {
  username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.auth) {
      token = data.token;
      userRole = data.role;
      document.getElementById('login-message').textContent = 'Login successful!';
      // Redirect based on role
      if (userRole === 'admin') {
        window.location.href = `/admin.html?token=${token}&username=${username}`;
      } else {
        window.location.href = `/user.html?token=${token}&username=${username}`;
      }
    } else {
      document.getElementById('login-message').textContent = 'Login failed!';
    }
  })
  .catch(error => console.error('Error:', error));
}

function register() {
  const reg_username = document.getElementById('reg_username').value;
  const reg_password = document.getElementById('reg_password').value;
  const role = document.getElementById('reg_role').value;

  fetch('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: reg_username, password: reg_password, role })
  })
  .then(response => response.json())
  .then(data => {
    if (response.ok) {
      document.getElementById('register-message').textContent = 'User registered successfully!';
      // Redirect to login after successful registration
      showLogin();
    } else {
      document.getElementById('register-message').textContent = 'Registration failed!';
    }
  })
  .catch(error => console.error('Error:', error));
}
