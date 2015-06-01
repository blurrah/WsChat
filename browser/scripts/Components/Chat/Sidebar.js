import React from 'react';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section id="sidebar">
                <ul>
                    <li><a href="">Naam van gebruiker</a></li>
                    <li><a href="">Naam van gebruiker</a></li>
                    <li><a href="">Naam van gebruiker</a></li>
                </ul>
            </section>
        )
    }

}
