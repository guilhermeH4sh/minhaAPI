const mongoose = require('mongoose');

const DisciplinaSchema = new mongoose.Schema({
    codigo: { type: String, required: true },
    nome: { type: String, required: true },
    professor: { type: String, required: true }
}, { _id: false });

const AlunoSchema = new mongoose.Schema({
    ra: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    disciplinas: [DisciplinaSchema]
}, { versionKey: false });

const Aluno = mongoose.model('Aluno', AlunoSchema, 'alunos');

module.exports = Aluno;
