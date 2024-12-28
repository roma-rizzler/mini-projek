const connection = require('../config/db');

exports.createUser = (data, callback) => {
  const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
  connection.query(query, [data.username, data.password, data.role], callback);
};

exports.getUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], callback);
};

// Tambahkan metode lain jika diperlukan
