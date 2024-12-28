const express = require('express');
const router = express.Router();
const kapalController = require('../controlers/kapalController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

// Tambahkan middleware JWT dan pengecekan peran admin
router.post('/', jwtMiddleware.verifyJWT, (req, res, next) => {
  if (req.userRole !== 'admin') return res.status(403).send('Only admin can add ships.');
  next();
}, kapalController.createKapal);

router.get('/', kapalController.getAllKapal);

router.get('/:id', kapalController.getKapalById);

router.put('/:id', jwtMiddleware.verifyJWT, (req, res, next) => {
  if (req.userRole !== 'admin') return res.status(403).send('Only admin can update ships.');
  next();
}, kapalController.updateKapal);

router.delete('/:id', jwtMiddleware.verifyJWT, (req, res, next) => {
  if (req.userRole !== 'admin') return res.status(403).send('Only admin can delete ships.');
  next();
}, kapalController.deleteKapal);

module.exports = router;
