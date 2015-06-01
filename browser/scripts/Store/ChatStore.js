import alt from '../alt';
import ChatServerActionCreators from '../Actions/ChatServerActionCreators';

class ChatStore {
    constructor() {
        this.bindActions(ChatServerActionCreators);

        this.status = null;

        this.users = [];

        this.messages = [];
    }

    onReceiveServerStatus({status}) {
        if (status)  {
            this.status = 'online';
        } else {
            this.status = 'offline';
        }
    }

    onReceiveUsers(users) {
        console.log('store received users');
        this.users = users;
    }

}

export default alt.createStore(ChatStore, 'ChatStore');
