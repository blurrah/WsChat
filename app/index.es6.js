import app from 'app';
import ipc from 'ipc';
import BrowserWindow from 'browser-window';

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
    mainWindow.openDevTools();

    mainWindow.loadUrl('file://' + __dirname + '/../browser/index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    ipc.on('application-mounted', function(event) {
        console.log('React module has mounted');
    });

    ipc.on('login-start', function(event, login) {
        console.log(`Login is: ${login}`);
    });
});
