import React from 'react';
import Sidebar from './Sidebar';
import ChatStore from '../../Store/ChatStore';
import MessageComposer from './MessageComposer';

function _getStateFromStore() {
    return ChatStore.getState();
};

let testMessages = [
    {
        user: 'Boris',
        message: 'Dit is het eerste bericht'
    },
    {
        user: 'Ikke',
        message: 'Hallo daar gekkentjens!'
    },
    {
        user: 'Plas',
        message: 'Ik kom uit een piemel'
    }
];

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

    componentDidMount() {
        console.log(this.state);
    }

    render() {
        let messages = testMessages.map((item) => {
            if(item.user === this.state.currentUser) {
                return <div key={item.user} className="chat-item self"><h2>{item.user}</h2> <p>{item.message}</p></div>
            }
            return <div className="chat-item" key={item.user}><h3>{item.user}</h3> <p>{item.message}</p></div>
        });
        return (
            <section id="chatpage">
                <Sidebar users={this.state.users} />
                <section id="chat">
                    {messages}
                    <MessageComposer />
                </section>
            </section>
        )
    }
}
