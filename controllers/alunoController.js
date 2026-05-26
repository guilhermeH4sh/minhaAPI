const AlunoModel = require('../models/alunoModel');

// GET /alunos - Exibir todos os alunos
exports.obterTodos = async (req, res) => {
    try {
        const alunos = await AlunoModel.find();
        res.json(alunos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter alunos', error: error.message });
    }
};

// GET /alunos/:ra - Buscar um aluno pelo RA
exports.obterPorRa = async (req, res) => {
    const ra = req.params.ra;
    try {
        const aluno = await AlunoModel.findOne({ ra: ra });
        if (!aluno) {
            return res.status(404).json({ message: `Aluno com RA ${ra} não encontrado` });
        }
        res.json(aluno);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar aluno', error: error.message });
    }
};

// GET /alunos/:ra/disciplinas - Listar todas as disciplinas de um aluno
exports.obterDisciplinas = async (req, res) => {
    const ra = req.params.ra;
    try {
        const aluno = await AlunoModel.findOne({ ra: ra });
        if (!aluno) {
            return res.status(404).json({ message: `Aluno com RA ${ra} não encontrado` });
        }
        res.json(aluno.disciplinas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar disciplinas', error: error.message });
    }
};

// PUT /alunos/:ra - Atualizar os dados de um aluno
exports.atualizar = async (req, res) => {
    const ra = req.params.ra;
    const dadosAtualizados = req.body;
    try {
        // Evita que o RA seja alterado na atualização caso venha no body
        if (dadosAtualizados.ra && dadosAtualizados.ra !== ra) {
            delete dadosAtualizados.ra;
        }

        const aluno = await AlunoModel.findOneAndUpdate(
            { ra: ra },
            dadosAtualizados,
            { new: true, runValidators: true }
        );

        if (!aluno) {
            return res.status(404).json({ message: `Aluno com RA ${ra} não encontrado` });
        }

        res.json({ message: 'Aluno atualizado com sucesso', aluno });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar dados do aluno', error: error.message });
    }
};
