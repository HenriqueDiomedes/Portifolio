const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

router.post('/cadastro', (req, res) => {
  const { nome, email, senha, confirmar_senha } = req.body;

  if (senha !== confirmar_senha) {
    return res.status(400).send({ erro: 'Senhas não conferem' });
  }

  const senhaHash = bcrypt.hashSync(senha, 10);

  const usuario = new Usuario({ nome, email, senha: senhaHash });
  usuario.save((err) => {
    if (err) {
      return res.status(400).send({ erro: 'Erro ao cadastrar' });
    }
    res.redirect('/login');
  });
});

module.exports = router;