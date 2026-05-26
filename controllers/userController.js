const UserModel = require('../models/userModel');

exports.inserir = async (req, res) => {
  const usuario = req.body;
  try {
    const novoUsuario = await UserModel.create(usuario);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao inserir usuário', error: error.message });
  }
};

exports.obterTodos = async (req, res) => {
  try {
    const usuarios = await UserModel.find();
    res.json(usuarios);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao obter usuários', error: error.message });
  }
};

exports.obterPorId = async (req, res) => {
  const id = req.params.id;
  try {
    const usuario = await UserModel.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao obter usuário', error: error.message });
  }
};

exports.atualizar = async (req, res) => {
  const id = req.params.id;
  const usuario = req.body;
  try {
    const resultado = await UserModel.findByIdAndUpdate(id, usuario, { new: true });
    if (!resultado) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário atualizado com sucesso', usuario: resultado });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar usuário', error: error.message });
  }
};

exports.excluir = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await UserModel.findByIdAndDelete(id);
    if (!resultado) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao excluir usuário', error: error.message });
  }
};
