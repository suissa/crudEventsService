var Beer = require('./../models/beer')
  , crudEvents = require('./../models/crudEvents')
  , crudEventsService = require('./../services/crudEventsService')
  , eventsService = new crudEventsService;

// CRUD Events
eventsService.setEvent('preCreate', crudEvents.create.pre, Beer);
eventsService.setEvent('posCreate', crudEvents.create.pos, Beer);

eventsService.setEvent('preFind', crudEvents.find.pre, Beer);
eventsService.setEvent('posFind', crudEvents.find.pos, Beer);

eventsService.setEvent('preUpdate', crudEvents.update.pre, Beer);
eventsService.setEvent('posUpdate', crudEvents.update.pos, Beer);

eventsService.setEvent('preRemove', crudEvents.remove.pre, Beer);
eventsService.setEvent('posRemove', crudEvents.remove.pos, Beer);

module.exports = {
  create: function (req, res) {
    var dados = {
      name: 'Heineken',
      description: 'Até q eh boazinha',
      alcohol: 5.5,
      price: 3.5,
      category: 'lager'
    }
      , msg
      , model = new Beer(dados);

    eventsService.emit('preCreate', dados);

    model.save(function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = 'Erro: ' + err;
      }
      else{
        console.log('Cerveja Inserida: ', data);
        msg = 'Cerveja inserida: ' + JSON.stringify(data);
        eventsService.emit('posCreate', data);
      }
      res.end(msg);
    });
  },
  retrieve: function (req, res) {
    var query = {};

    eventsService.emit('preFind', query);

    Beer.find(query, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = 'Erro: ' + err;
      }else{
        console.log('Listagem: ', data);
        msg = 'Listagem: ' + data;
        eventsService.emit('posFind', data);
      }
      res.end(msg);
    });
  },
  update: function (req, res) {

    var query = {name: 'Heineken'};

    var mod = {alcohol: 80};

    eventsService.emit('preUpdate', mod);

    var optional = {
        upsert: false,
        multi: true
      };

    Beer.update(query, mod, optional, function (err, data) {
      if (err){
        console.log('Erro: ', err);
        msg = 'Erro: ' + err;
      }
      else{
        console.log('Cerveja atualizada com sucesso', data);
        msg = 'Cerveja atualizadas com sucesso: ' + data;
        eventsService.emit('posUpdate', data);
      }
      res.end(msg);
    });
  },
  delete: function (req, res) {

    var query = {name: /heineken/i};

    eventsService.emit('preRemove', query);

    Beer.remove(query, function(err, data) {
      if(err) {
        console.log(err);
        msg = 'Erro: ' + err;
      } else {
        console.log('Cerveja deletada com sucesso, quantidade: ', data);
        msg = 'Cerveja deletadas com sucesso: ' + data;
        eventsService.emit('posRemove', data);
      }
      res.end(msg);
    });
  }
};