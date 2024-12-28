const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    console.log('No token provided.');
    return res.status(403).send('No token provided.');
  }
  console.log('Token:', token);
  jwt.verify(token, 'supersecretkey', (err, decoded) => {
    if (err) {
      console.error('Failed to authenticate token.');
      return res.status(500).send('Failed to authenticate token.');
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};
