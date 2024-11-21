const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cadastroRouter = require('./routes/cadastro');
const loginRouter = require('./routes/login');
const perfilRouter = require('./routes/perfil');
const logoutRouter = require('./routes/logout');

mongoose.connect('mongodb://localhost/projeto06', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/cadastro', cadastroRouter);
app.use('/login', loginRouter);
app.use('/perfil', perfilRouter);
app.use('/logout', logoutRouter);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000!');
});