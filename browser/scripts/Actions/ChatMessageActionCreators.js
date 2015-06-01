import alt from '../alt';

class ChatMessageActionCreators {
    constructor() {
        this.generateActions('getUsername', 'sendStatus', 'sendMessage');
    }
}

export default alt.createActions(ChatMessageActionCreators);
