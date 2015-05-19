import alt from '../alt';
import ChatMessageActionCreators from '../Actions/ChatMessageActionCreators';
import ChatServerActionCreators from '../Actions/ChatServerActionCreators';

class ChatStore {
    constructor() {

        this.bindAction(ChatMessageActionCreators.receiveServerStatus, this.receiveServerStatus);

        this.status = null;

        this.users = [];

        this.messages = [];
    }

    receiveServerStatus({status}) {
        alert('HAI');
        console.log('status %s received', status);
        if (status) this.status = status;
    }

}

export default alt.createStore(ChatStore, 'ChatStore');
