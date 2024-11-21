const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;