import React from 'react';
import LoginPage from './Components/Login/Loginpage';

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
                <p>Electron versie is {process.versions['electron']}</p>
                <LoginPage handleLogin={this.handleLogin} />
            </header>
        );
    }
    handleLogin(data) {
        ipc.send('login-start', data);
    }
};

React.render(<TestComponent />, document.body);
