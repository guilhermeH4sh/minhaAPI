require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const alunosRouter = require('./routes/alunos');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('public'));

connectDB();

app.use('/api', indexRouter);
app.use('/users', usersRouter);
app.use('/alunos', alunosRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`);
});
