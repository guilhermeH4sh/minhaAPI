const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.obterTodos);
router.get('/:id', userController.obterPorId);
router.post('/', userController.inserir);
router.delete('/:id', userController.excluir);
router.put('/:id', userController.atualizar);

module.exports = router;
