import React from 'react';
import LoginPage from './Components/Loginpage';

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <h1>LeagueChat</h1>
                <p>Electron versie is {process.versions['electron']}</p>
                <LoginPage />
            </header>
        );
    }
};

React.render(<TestComponent />, document.body);
