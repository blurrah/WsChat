import React from 'react';

const ENTER_KEY_CODE = 13;

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: ''
        };
    }

    render() {
        return (
            <section id="login">
                <div className="inner">
                    <h1>LeagueChat</h1>
                    <p>Log in to the Chat met een veel langer verhaaltje.</p>
                    <form>
                        <input type="text" name="login" placeholder="Login..."
                            ref="login"
                            value={this.state.login}
                            onChange={this._onChange.bind(this)}
                            onKeyDown={this._onKeyDown.bind(this)}
                        />
                        <p>Login is: {this.state.login}</p>
                    </form>
                </div>
            </section>
        )
    }

    _onChange(event) {
            this.setState({ login: event.target.value });
    }

    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            let login = this.state.login.trim();

            event.preventDefault();

            if (login) {
                this.props.handleLogin(login)
            }
            this.setState({ login: '' });
        }
    }
}
