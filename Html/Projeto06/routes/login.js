const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  Usuario.findOne({ email }, (err, usuario) => {
    if (err || !usuario) {
      return res.status(401).send({ erro: 'Usuário não encontrado' });
    }

    if (!bcrypt.compareSync(senha, usuario.senha)) {
      return res.status(401).send({ erro: 'Senha incorreta' });
    }

    res.send({ mensagem: 'Usuário logado com sucesso!' });
  });
});

module.exports = router;