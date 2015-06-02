import alt from '../alt';
import ChatServerActionCreators from '../Actions/ChatServerActionCreators';
import ChatMessageActionCreators from '../Actions/ChatMessageActionCreators';

class ChatStore {
    constructor() {
        this.bindActions(ChatServerActionCreators);
        this.bindActions(ChatMessageActionCreators);

        this.status = null;
        this.currentUser = null;

        this.users = [];

        this.messages = [];
    }

    onReceiveServerStatus({status}) {
        if (status) {
            this.status = 'online';
        } else {
            this.status = 'offline';
        }
    }

    onReceiveUsers({username}) {
        console.log('store received users');
        this.users = username;
    }

    onReceiveMessages({messages}) {
        console.log('onReceiveMessages called with: ' + messages);
        this.messages = messages;
    }

    onGetUsername(username) {
        this.currentUser = username;
    }


}

export default alt.createStore(ChatStore, 'ChatStore');
