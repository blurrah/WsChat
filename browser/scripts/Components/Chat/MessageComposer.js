import React from 'react';

export default class MessageComposer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="message-composer">
                <form action="" id="composer">
                    <input name="input" id=""></input>
                </form>
            </div>
        );
    }
}
