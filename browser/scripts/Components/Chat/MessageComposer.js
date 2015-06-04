import React from 'react';

export default class MessageComposer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="message-composer">
                    <input onKeyDown={this._onChange.bind(this)} ref="input" name="input" placeholder="Chat message..."></input>
            </div>
        );
    }

    _onChange(event) {
        if(event.keyCode === 13) {
            var result = React.findDOMNode(this.refs.input).value;
            this.props.handleSendMessage(result);
            React.findDOMNode(this.refs.input).value = '';
        }
    }
}
