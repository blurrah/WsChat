import React from 'react';
import ChatStore from '../../Store/ChatStore';
import WebSockets from '../../Utils/Websockets';

const ENTER_KEY_CODE = 13;

function _getStateFromStore() {
    return ChatStore.getState();
}

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = _getStateFromStore();
    }

    componentWillMount() {
        ChatStore.listen(this.onStoreChange.bind(this));
    }

    componentWillUnmount() {
        ChatStore.unlisten(this.onStoreChange.bind(this));
    }

    onStoreChange() {
        this.setState(_getStateFromStore);
    }

    render() {
        return (
            <section id="login">
                <div className="inner">
                    <h1>LeagueChat</h1>
                    <p>Pick a username and login to the chat.</p>
                    <form>
                        <input type="text" name="login" placeholder="Login..."
                            ref="login"
                            value={this.state.login}
                            onChange={this._onChange.bind(this)}
                            onKeyDown={this._onKeyDown.bind(this)}
                        />
                    </form>
                    <p className={this.state.status} >Current server status is: {this.state.status}</p>
                    <a className="button" onClick={this._onRefresh.bind(this)} >Refresh server status</a>
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

    _onRefresh(event) {
        event.preventDefault();
        WebSockets.init();
    }
}
