import React from 'react';
import LoginPage from './Components/Login/Loginpage';
import ChatServerActionCreators from './Actions/ChatServerActionCreators';
import WebSockets from './Utils/WebSockets';

WebSockets.init();

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        ipc.send('application-mounted');
    }

    render() {
        return (
            <header>
                <p className="info">Electron versie is {process.versions['electron']}</p>
                <LoginPage handleLogin={this.handleLogin} />
            </header>
        );
    }
    handleLogin(login) {
        ipc.send('login-start', login);
    }
};

React.render(<TestComponent />, document.body);
