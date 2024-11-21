const express = require('express');  
const app = express();  
const port = 3000;  
const passport = require('passport');  
const bcrypt = require('bcrypt');  
const LocalStrategy = require('passport-local').Strategy;  
const Usuario = require('./models/Usuario');  

app.use(express.static('public')); // serve o diretório público  
app.use(express.urlencoded({ extended: true })); // lidere com requisições POST  

app.use(passport.initialize());  

passport.use(new LocalStrategy({  
  usernameField: 'email',  
  passwordField: 'senha'  
}, (email, senha, done) => {  
  Usuario.findOne({ email: email }, (err, usuario) => {  
    if (err) {  
      return done(err);  
    }  
    if (!usuario) {  
      return done(null, false, { message: 'E-mail ou senha inválidos' });  
    }  
    if (!bcrypt.compareSync(senha, usuario.senha)) {  
      return done(null, false, { message: 'E-mail ou senha inválidos' });  
    }  
    return done(null, usuario);  
  });  
}));  

passport.serializeUser((usuario, done) => {  
  done(null, usuario.id);  
});  

passport.deserializeUser((id, done) => {  
  Usuario.findById(id, (err, usuario) => {  
    done(err, usuario);  
  });  
});  

app.post('/login', passport.authenticate('local', {  
  successRedirect: '/success',  
  failureRedirect: '/failure'  
}));  

app.post('/cadastro', (req, res) => {  
  const { nome, email, senha, confirmar_senha } = req.body;  
  if (nome && email && senha && confirmar_senha) {  
    if (senha === confirmar_senha) {  
      const usuario = new Usuario({  
        nome: nome,  
        email: email,  
        senha: bcrypt.hashSync(senha, 10)  
      });  
      usuario.save((err) => {  
        if (err) {  
          res.status(500).send({ message: 'Erro ao criar o usuário' });  
        } else {  
          res.send({ message: 'Usuário criado com sucesso' });  
        }  
      });  
    } else {  
      res.status(400).send({ message: 'Senhas não conferem' });  
    }  
  } else {  
    res.status(400).send({ message: 'Preencha todos os campos' });  
  }  
});  

app.get('/', (req, res) => {  
  res.sendFile(__dirname + '/index.html');  
});  

app.get('/success', (req, res) => {  
  res.send('Login bem-sucedido!');  
});  

app.get('/failure', (req, res) => {  
  res.send('Falha no login!');  
});  

app.listen(port, () => {  
  console.log(`Servidor rodando em http://localhost:${port}`);  
});