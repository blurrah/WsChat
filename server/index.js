var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 5222 });

var users = [];

wss.on('connection', function connection(ws) {
    console.log('client connected');

    ws.on('message', function incoming(data) {
        var result = JSON.parse(data);
        switch(result.type) {
            case 'presence':
                console.log('presence type!');
                users.push(result.message);
                ws.send(JSON.stringify(users));
            break;
            case 'getUsers':
                ws.send(JSON.stringify(users));
            break;
        };
    });

});

console.log('websockets server started on port: %s', 5222);
