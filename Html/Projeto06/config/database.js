const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/projeto06', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', () => {
  console.log('Conectado ao banco de dados!');
});

module.exports = db;