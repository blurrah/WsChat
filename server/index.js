var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 5222 });

wss.on('connection', function connection(ws) {
    console.log('user connected');

    ws.on('presence', function incoming(message) {
        console.log('received: %s', message);
    });
});
