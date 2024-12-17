const express = require('express');

const router = express.Router();
const utilizacaoController = require('../controllers/utilizacao.controller');

router.post('/create', utilizacaoController.create);
router.get('/getAll', utilizacaoController.getAll);
router.get('/getById/:id', utilizacaoController.getById);
router.post('/update/:id', utilizacaoController.update);
router.post('/delete/:id', utilizacaoController.delete);

module.exports = router;
