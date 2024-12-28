const connection = require('../config/db');

exports.createKapal = (data, callback) => {
  const query = 'INSERT INTO kapal (nama_kapal, jenis_kapal, kapasitas_muatan) VALUES (?, ?, ?)';
  connection.query(query, [data.nama_kapal, data.jenis_kapal, data.kapasitas_muatan], callback);
};

exports.getAllKapal = (callback) => {
  const query = 'SELECT * FROM kapal';
  connection.query(query, callback);
};

// Tambahkan metode lain seperti update dan delete
