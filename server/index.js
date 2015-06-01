var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 5222 });

var users = [];

wss.on('connection', function connection(ws) {
    console.log('client connected');
    var user;

    ws.on('message', function incoming(data) {
        var result = JSON.parse(data);
        switch(result.type) {
            case 'presence':
                console.log('presence type!');
                users.push(result.message);
                var user = result.message;
                ws.send(JSON.stringify({type: 'presence', username: users}));
            break;
            case 'getUsers':
                ws.send(JSON.stringify(users));
            break;
        };
    });

    ws.on('close', function close(data) {
        users.splice(users.indexOf(user), 1);
    });

});

console.log('websockets server started on port: %s', 5222);
