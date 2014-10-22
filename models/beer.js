var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beers-crud');

var db = mongoose.connection;
db.on('error', function(err){
    console.log('Erro de conexao.', err)
});
db.on('open', function () {
  console.log('Conexão aberta.')
});
db.on('connected', function(err){
    console.log('Conectado')
});
db.on('disconnected', function(err){
    console.log('Desconectado')
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name: { type: String, default: '', required: true },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0, default: 0},
  price: { type: Number, min: 0, default: 0},
  category: { type: String, default: ''},
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Beer', BeerSchema);

