import React from 'react/addons';

import ChatStore from '../../Store/ChatStore';
import Error from '../Reusables/Error';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
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
                    <ReactCSSTransitionGroup transitionName="error">
                        {this.state.showErrorMsg ? <Error errorMsg={this.state.errorMsg} /> : null }
                    </ReactCSSTransitionGroup>
                    <h1>LeagueChat</h1>
                    <p>Pick a username and login to the chat.</p>
                    <form>
                        <input type="text" name="login" placeholder="Login..."
                            ref="login"
                            onKeyDown={this._onKeyDown.bind(this)}
                        />
                    </form>
                    <p className={this.state.status}>Current server status is: {this.state.status}</p>
                    <a className="button" onClick={this._onRefresh.bind(this)} >Refresh server status</a>
                </div>
            </section>
        )
    }


    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            let login = React.findDOMNode(this.refs.login).value.trim();

            event.preventDefault();

            if (login && this.state.status === 'online') {
                this.props.handleLogin(login)
            } else {
                this.setState({
                    showErrorMsg: true,
                    errorMsg: 'Could not login..'
                });

                setTimeout(() => {
                    this.setState({
                        showErrorMsg: false
                    });
                }, 2000)
            }

            React.findDOMNode(this.refs.login).value = '';
        }
    }

    _onRefresh(event) {
        event.preventDefault();
        this.props.onRefresh();
    }
}
