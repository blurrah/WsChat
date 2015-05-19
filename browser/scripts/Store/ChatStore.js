import alt from '../alt';
import ChatServerActionCreators from '../Actions/ChatServerActionCreators';

class ChatStore {
    constructor() {
        this.bindAction(ChatServerActionCreators.receiveServerStatus, this.receiveServerStatus);

        this.status = null;

        this.users = [];

        this.messages = [];
    }

    receiveServerStatus({status}) {
        if (status)  {
            this.status = 'online';
        } else {
            this.status = 'offline';
        }
    }

}

export default alt.createStore(ChatStore, 'ChatStore');
