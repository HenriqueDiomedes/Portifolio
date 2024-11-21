const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.get('/perfil', (req, res) => {
  Usuario.findOne({ email: req.query.email }, (err, usuario) => {
    if (err || !usuario) {
      return res.status(401).send({ erro: 'Usuário não encontrado' });
    }

    res.render('perfil', { nome: usuario.nome, email: usuario.email });
  });
});

module.exports = router;