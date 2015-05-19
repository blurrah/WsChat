import alt from '../alt';

class ChatServerActionCreators {
    receiveServerStatus(data) {
        this.dispatch(data);
    }
}

export default alt.createActions(ChatServerActionCreators);
