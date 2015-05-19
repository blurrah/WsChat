import alt from '../alt';

class ChatMessageActionCreators {
    constructor() {
        this.generateActions('sendStatus', 'sendMessage');
    }
}

export default alt.createActions(ChatMessageActionCreators);
