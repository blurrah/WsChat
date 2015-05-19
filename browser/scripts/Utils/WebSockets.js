import WebSocket from 'ws';
import ChatServerActionCreators from '../Actions/ChatServerActionCreators';

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

let WebSocketsUtil = function() {
    // Factory function
    this.status = null;
};

WebSocketsUtil.init = function() {
    let ws = new WebSocket('ws://localhost:5222');

    ws.on('open', function open() {
        console.log('websockets connection opened');
        this.status = true;
        ChatServerActionCreators.receiveServerStatus({status: this.status});
    });

    ws.on('receive-users', function(data, flags) {
        ChatServerActionCreators.receiveUsers(data);
    });

    ws.on('receive-message', function receive(data, flags) {
        ChatServerActionCreators.receiveMessage(data);
    });

    // Catch disconnect
    setTimeout(() => {
        if (this.status === null) {
            this.status = false;
            console.log('did not connect!');
            ChatServerActionCreators.receiveServerStatus({status: this.status});
        }
    }, 1000);
};

export default WebSocketsUtil;
