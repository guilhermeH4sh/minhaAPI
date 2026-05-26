const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGO_URL = process.env.DB_URI || 'mongodb://127.0.0.1:27017/aula12';
    await mongoose.connect(MONGO_URL);
    console.log('Conectado ao mongoDB');

    // Seeding de alunos para facilitar testes
    const Aluno = require('../models/alunoModel');
    const count = await Aluno.countDocuments();
    if (count === 0) {
      console.log('Coleção de alunos está vazia. Inicializando dados de semente...');
      const initialAlunos = [
        {
          "ra": "1",
          "nome": "João",
          "disciplinas": [
            { "codigo": "MAT101", "nome": "Matemática", "professor": "Prof. Carlos" },
            { "codigo": "HIS101", "nome": "História", "professor": "Prof. Ana" },
            { "codigo": "POR101", "nome": "Português", "professor": "Prof. João" },
            { "codigo": "GEO101", "nome": "Geografia", "professor": "Prof. Ana" }
          ]
        },
        {
          "ra": "2",
          "nome": "Maria",
          "disciplinas": [
            { "codigo": "MAT101", "nome": "Matemática", "professor": "Prof. Carlos" },
            { "codigo": "HIS101", "nome": "História", "professor": "Prof. Ana" },
            { "codigo": "GEO101", "nome": "Geografia", "professor": "Prof. Ana" }
          ]
        },
        {
          "ra": "3",
          "nome": "Pedro",
          "disciplinas": [
            { "codigo": "CIE101", "nome": "Ciências", "professor": "Prof. João" },
            { "codigo": "HIS101", "nome": "História", "professor": "Prof. Ana" },
            { "codigo": "POR101", "nome": "Português", "professor": "Prof. João" },
            { "codigo": "GEO101", "nome": "Geografia", "professor": "Prof. Ana" },
            { "codigo": "EDF101", "nome": "Educação Física", "professor": "Prof. Carlos" }
          ]
        }
      ];
      await Aluno.insertMany(initialAlunos);
      console.log('Dados de semente de alunos inseridos com sucesso!');
    }
  } catch (error) {
    console.log('Erro ao conectar no MongoDB:', error.message);
  }
};

module.exports = connectDB;
