import React from 'react';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            region: 'euw'
        };
    }

    render() {
        return (
            <section id="login">
                <h1>LeagueChat</h1>
                <p>Log in to the Riot servers.</p>
                <form action="">
                    <input type="text" name="login" placeholder="Login..." ref="login" value={this.state.login} onChange={this._onChange.bind(this)} />
                    <input type="password" name="password" placeholder="Password..." ref="password" value={this.state.password} onChange={this._onChange.bind(this)} />
                    <select name="region" id="region" ref="region" value={this.state.region} onChange={this._onChange.bind(this)}>
                        <option value="euw">EU West</option>
                        <option value="eune">EU North East</option>
                        <option value="na">North America</option>
                    </select>
                    <input onClick={this._onSubmit.bind(this)} type="button" value="Login" />
                    <p>Login is: {this.state.login}</p>
                    <p>Password is: SECRET </p>
                    <p>Region is: {this.state.region}</p>
                </form>
            </section>
        )
    }

    _onChange(event) {

        if(event.target.name === 'login') {
            this.setState({
                login: event.target.value
            });
        } else if (event.target.name === 'password') {
            this.setState({
                password: event.target.value
            });
        } else if (event.target.name === 'region') {
            this.setState({
                region: event.target.value
            });
        }

        /*
        this.setState({
            login: React.findDOMNode(this.refs.login).value.trim(),
            password: React.findDOMNode(this.refs.password).value.trim(),
        });
        */

    }

    _onSubmit() {
        let data = {
            login: this.state.login,
            password: this.state.password,
            region: this.state.region
        };
        this.props.handleLogin(data);

        this.setState({
            login: '',
            password: '',
            region: 'euw'
        });
    }
}
