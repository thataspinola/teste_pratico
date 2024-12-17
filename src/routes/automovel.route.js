const express = require('express');

const router = express.Router();
const automovelController = require('../controllers/automovel.controller');

router.post('/create', automovelController.create);
router.get('/getAll', automovelController.getAll);
router.get('/getById/:id', automovelController.getById);
router.get('/getByPlaca/:placa', automovelController.getByPlaca);
router.post('/update/:id', automovelController.update);
router.post('/delete/:id', automovelController.delete);

module.exports = router;
