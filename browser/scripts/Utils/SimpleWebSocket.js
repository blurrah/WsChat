import WebSocket from 'ws';

WebSocket.prototype.on = function (event, callback) {
  this['on'+event] = callback;
};

WebSocket.prototype.once = function (event, callback) {
    var self = this;
  this['on'+event] = function () {
    callback.apply(callback, arguments);
    self['on'+event] = null;
  };
};

WebSocket.prototype.off = function (event, callback) {
  this['on'+event] = callback;
};


export default new WebSocket('ws://node.borisbesemer.com:5222');
