const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');

// GET /alunos
router.get('/', alunoController.obterTodos);

// GET /alunos/:ra
router.get('/:ra', alunoController.obterPorRa);

// GET /alunos/:ra/disciplinas
router.get('/:ra/disciplinas', alunoController.obterDisciplinas);

// PUT /alunos/:ra
router.put('/:ra', alunoController.atualizar);

module.exports = router;
