import React from 'react';
import LoginPage from './Components/Login/LoginPage';
import ChatPage from './Components/Chat/ChatPage';
import ChatServerActionCreators from './Actions/ChatServerActionCreators';
import ChatMessageActionCreators from './Actions/ChatMessageActionCreators';
import ws from './Utils/SimpleWebSocket';
//import WebSockets from './Utils/WebSockets';

function _checkServerStatus() {
    this.status = null;

    ws.on('open', () => {
        console.log('connected to websockets');
        this.status = true;
        ChatServerActionCreators.receiveServerStatus({status: this.status});
    });

    // Catch disconnect
    setTimeout(() => {
        console.log('settimeout called met status: ' + this.status);
        if (this.status === null || this.status === false) {
            this.status = false;
            ChatServerActionCreators.receiveServerStatus({status: false});
        }
    }, 2000);
}

ws.on('message', (event) => {
    let result = JSON.parse(event.data);
    if(result.type === 'presence') {
        ChatServerActionCreators.receiveUsers(result);
    }
});


_checkServerStatus();

class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.state.currentPage = <LoginPage handleLogin={this._handleLogin.bind(this)} onChangePage={this._handleChangePage} onRefresh={this._handleRefreshStatus.bind(this)} />;
    }

    componentDidMount() {
        ipc.send('application-mounted');
    }

    render() {
        return (
            <header>
                <p className="info">Electron versie is {process.versions['electron']}</p>
                {this.state.currentPage}
            </header>
        );
    }

    _handleLogin(login) {
        ChatMessageActionCreators.getUsername(login);

        ws.send(JSON.stringify({type: 'presence', message: login}), (error) => {
            console.log(error);
        });

        // Electron does not use URL's so can't use a proper router
        this.setState({
            currentPage: <ChatPage />
        });
    }

    _handleRefreshStatus() {
        _checkServerStatus();
    }

};

React.render(<Application />, document.body);
