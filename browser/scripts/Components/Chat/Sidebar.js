import React from 'react';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let users;

        if (this.props.users.length > 0) {
            users = this.props.users.map((name) => {
                return <li key={name}><a href="#">{name}</a></li>;
            });
        } else {
            users = <li><a>Getting users</a></li>;
        }

        return (
            <section id="sidebar">
                <ul>
                    {users}
                </ul>
            </section>
        )
    }
}
