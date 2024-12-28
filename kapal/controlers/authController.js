const connection = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
  connection.query(query, [username, hashedPassword, role], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(`User added with ID: ${results.insertId}`);
  });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  console.log('Login request received:', { username });

  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], (err, results) => {
      if (err) {
          console.error('Database query error:', err);
          return res.status(500).send(err);
      }

      if (results.length === 0) {
          console.log('User not found:', username);
          return res.status(404).send('User not found.');
      }

      const user = results[0];
      console.log('User found:', user);

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      console.log('Password validation result:', passwordIsValid);

      if (!passwordIsValid) {
          console.log('Invalid password for user:', username);
          return res.status(401).send('Invalid password.');
      }

      const token = jwt.sign(
          { id: user.id_user, role: user.role },
          'supersecretkey',
          { expiresIn: 86400 }
      );
      console.log('Token created:', token);

      res.json({ 
          auth: true, 
          token, 
          role: user.role 
      });
  });
};
