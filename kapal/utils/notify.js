// utils/notify.js
const { getIo } = require('../config/socket');

const notifyDataChange = (event) => {
  const io = getIo();
  io.emit('data_changed', {
    event: 'data_changed',
    message: 'Data kapal telah diperbarui.',
    data: event
  });
};

module.exports = { notifyDataChange };
