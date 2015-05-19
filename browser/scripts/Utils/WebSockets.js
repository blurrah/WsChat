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
};

WebSocketsUtil.init = function() {
    let ws = new WebSocket('ws://localhost:5222');
    this.status = null;

    ws.on('open', () => {
        console.log('connected to websockets');
        this.status = true;
        ChatServerActionCreators.receiveServerStatus({status: this.status});
    });

    ws.on('receive-users', (data, flags) => {
        ChatServerActionCreators.receiveUsers(data);
    });

    ws.on('receive-message', (data, flags) => {
        ChatServerActionCreators.receiveMessage(data);
    });

    // Catch disconnect
    setTimeout(() => {
        if (this.status !== true) {
            console.log('settimeout called with this.status: ' + this.status);
            this.status = false;
            ChatServerActionCreators.receiveServerStatus({status: false});
        }
    }, 2000);
};

export default WebSocketsUtil;
