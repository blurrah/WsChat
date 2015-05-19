import React from 'react';
import LoginPage from './Components/Login/LoginPage';
import ChatPage from './Components/Chat/ChatPage';
import ChatServerActionCreators from './Actions/ChatServerActionCreators';
import WebSockets from './Utils/WebSockets';

WebSockets.init();

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.state.currentPage = <LoginPage handleLogin={this._handleLogin.bind(this)} onChangePage={this._handleChangePage} />;
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
        ipc.send('login-start', login);
        this.setState({
            currentPage: <ChatPage />
        });
    }

    _changePage(page) {
        // Electron doesn't support a router because it doesn't use URLs :(

    }
};

React.render(<TestComponent />, document.body);
