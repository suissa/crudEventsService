var events = require('events')
  , eventEmitter = new events.EventEmitter();

module.exports = function() {
  var _eventEmitter = eventEmitter;

  function _setModel(model) {
    this.model= model;
    return this;
  }
  function _setEvent(event, fn, model) {
    _eventEmitter.on(event, fn);
    _setModel(model);
    return this;
  }

  function _emit(event, obj) {
    _eventEmitter.emit(event, obj);
    return this;
  }

  return {
    setEvent: _setEvent,
    emit: _emit
  }
};