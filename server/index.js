var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 5222 });

var users = [];

var messages = [];

wss.on('connection', function connection(ws) {
    console.log('client connected');
    var user;

    ws.on('message', function incoming(data) {
        var result = JSON.parse(data);
        switch(result.type) {
            case 'presence':
                console.log('presence type!');
                users.push(result.message);
                console.log(users);
                user = result.message;
                broadcastNewUsers(users);
                ws.send(JSON.stringify({type: 'message', messages: messages}));
                //ws.send(JSON.stringify({type: 'presence', username: users}));
            break;
            case 'message':
                console.log('sending message');
                messages.push({
                    user: user,
                    message: result.message.message
                });
                broadcastNewMessages(messages);
            break;
        };
    });

    ws.on('close', function close(data) {
        users.splice(users.indexOf(user), 1);
        broadcastNewUsers(users);
    });

});

function broadcastNewUsers(data) {
    var result = {
        type: 'presence',
        username: data
    };

    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(result));
    });
}

function broadcastNewMessages(data) {
    console.log(messages);
    var result = {
        type: 'message',
        messages: data
    };

    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(result));
    });
}

console.log('websockets server started on port: %s', 5222);
