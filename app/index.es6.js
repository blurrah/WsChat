import app from 'app';
import ipc from 'ipc';
import BrowserWindow from 'browser-window';
import lolChat from 'node-lol-xmpp';
import Client from 'node-xmpp-client';

require('crash-reporter').start();

let mainWindow = null;

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadUrl('file://' + __dirname + '/../browser/index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    ipc.on('application-mounted', function(event) {
        console.log('React module has mounted');
    });

    ipc.on('login-start', function(event, data) {

        let client = new Client({
            jid: data.login + '@pvp.net/xiff',
            password: 'AIR_' + data.password,
            host: 'chat.euw1.lol.riotgames.com',
            port: 5223
        });
        
        client.on('online', (data) => {
            console.log('CONNECTED');
        });

        client.on('stanza', (data) => {
            console.log('stanza');
        });
    });
});
