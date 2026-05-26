const mongoose = require('mongoose');

const User = mongoose.model('User', {
    nome: String,
    email: String,
    senha: String,
    ativo: Boolean
}, "users");

module.exports = User;
