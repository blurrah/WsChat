import React from 'react';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section id="login">
                <form action="">
                    <input type="text" name="login" placeholder="Login..." />
                    <input type="password" name="password" placeholder="Password..." />
                </form>
            </section>
        )
    }
}
