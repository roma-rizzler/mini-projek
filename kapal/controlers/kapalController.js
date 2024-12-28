const connection = require('../config/db');
const { notifyDataChange }= require('../utils/notify');
console.log('Notify Data Change Function:', notifyDataChange);

exports.createKapal = (req, res) => {
    const { nama_kapal, jenis_kapal, kapasitas_muatan } = req.body;
    console.log('Request received for createKapal with data:', req.body);
    const query = 'INSERT INTO kapal (nama_kapal, jenis_kapal, kapasitas_muatan) VALUES (?, ?, ?)';
    connection.query(query, [nama_kapal, jenis_kapal, kapasitas_muatan], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).send(err);
      }
      notifyDataChange({ id_kapal: results.insertId, nama_kapal, jenis_kapal, kapasitas_muatan });
      res.status(201).json({ message: `Kapal added with ID: ${results.insertId}` });
    });
  };
  

exports.getAllKapal = (req, res) => {
    console.log('Request received for getAllKapal');
    const query = 'SELECT * FROM kapal';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).send(err);
      }
      console.log('Results:', results);
      res.json(results);
    });
  };
  
  exports.getKapalById = (req, res) => {
    const { id } = req.params;
    console.log('Request received for getKapalById with ID:', id);
    const query = 'SELECT * FROM kapal WHERE id_kapal = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).send(err);
      }
      if (results.length === 0) return res.status(404).send('Kapal not found.');
      console.log('Results:', results);
      res.json(results[0]);
    });
  };
  
  

exports.updateKapal = (req, res) => {
  const { id } = req.params;
  const { nama_kapal, jenis_kapal, kapasitas_muatan } = req.body;
  const query = 'UPDATE kapal SET nama_kapal = ?, jenis_kapal = ?, kapasitas_muatan = ? WHERE id_kapal = ?';
  connection.query(query, [nama_kapal, jenis_kapal, kapasitas_muatan, id], (err, results) => {
    if (err) return res.status(500).send(err);
    notifyDataChange({ id_kapal: id, nama_kapal, jenis_kapal, kapasitas_muatan });
    res.send(`Kapal with ID: ${id} updated.`);
  });
};

exports.deleteKapal = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM kapal WHERE id_kapal = ?';
  connection.query(query, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    notifyDataChange({ id_kapal: id });
    res.send(`Kapal with ID: ${id} deleted.`);
  });
};
