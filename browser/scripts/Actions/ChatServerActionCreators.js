import alt from '../alt';

class ChatServerActionCreators {
    constructor() {
        this.generateActions('receiveServerStatus', 'receiveUsers', 'receiveMessages');
    }
}

export default alt.createActions(ChatServerActionCreators);
