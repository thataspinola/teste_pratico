const express = require('express');

const router = express.Router();
const motoristaController = require('../controllers/motorista.controller');

router.post('/create', motoristaController.create);
router.get('/getAll', motoristaController.getAll);
router.get('/getById/:id', motoristaController.getById);
router.get('/getByNome/:nome', motoristaController.getByNome);
router.post('/update/:id', motoristaController.update);
router.post('/delete/:id', motoristaController.delete);

module.exports = router;
