import React from 'react';
import Sidebar from './Sidebar';
import ChatStore from '../../Store/ChatStore';
import MessageComposer from './MessageComposer';

function _getStateFromStore() {
    return ChatStore.getState();
}


export default class ChatPage extends React.Component {
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
            <section id="chatpage">
                <Sidebar />
                <section id="chat">
                    <h1>De chat pagina!</h1>
                    <MessageComposer />
                </section>
            </section>
        )
    }
}
