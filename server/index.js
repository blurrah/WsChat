var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 5222 });

wss.on('connection', function connection(ws) {
    console.log('client connected');

    ws.on('presence', function incoming(message) {
        console.log('received: %s', message);
    });
});

console.log('websockets server started on port: %s', 5222);
