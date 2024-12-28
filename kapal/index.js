const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { initializeSocket } = require('./config/socket');
const kapalRoutes = require('./routes/kapal');
const authRoutes = require('./routes/auth');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin.html', (req, res) => {
  res.sendFile(__dirname + '/public/admin.html');
});

app.get('/user.html', (req, res) => {
  res.sendFile(__dirname + '/public/user.html');
});

app.use('/kapal', kapalRoutes);
app.use('/auth', authRoutes);

initializeSocket(server);

const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
