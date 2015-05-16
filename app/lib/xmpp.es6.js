import xmpp from 'node-xmpp-client';
import { EventEmitter } from 'events';
import extend from 'xtend';
import { parseString } from 'xml2js';

let allFriends = {};
let onlineFriends = {};

// Settings
let conn;
let internalEvents = new EventEmitter();

// LoL XMPP events
const PASSWORD_PREFIX = 'AIR_';
const RESOURCE = 'xiff';
const DOMAIN = 'pvp.net';
const PORT = 5223;
const LEGACY_SSL = true;

export default class leagueXMPP {
    constructor() {


    }

    static connectTest(username, password, server) {

        let conn2 = new xmpp.Client({
            jid: `${username}@${DOMAIN}/${RESOURCE}`,
            password: PASSWORD_PREFIX + password,
            host: 'chat.euw1.lol.riotgames.com',
            port: PORT,
            legacySSL: LEGACY_SSL
        });

        console.log('new client made');

        conn2.on('online', (data) => {
            console.log(data);

            if(conn2.connection.socket) {
                conn2.connection.socket.setTimeout(0);
                conn2.connection.socet.setKeepAlive(true, 10000);
            }
        });
    }

    static connect(username, password, server) {


        this.conn = conn;
        this.username = username;

        conn.on('close', () => {
            internalEvents.emit('close');
        });

        conn.on('error', (err) => {
            internalEvents.emit('error', err);
        });

        conn.on('online', (data) => {
            console.log(xmpp.Element);
            console.log(data);
            conn.send(new xmpp.Element('presence'));
            internalEvents.emit('online', data);

            if(this.conn.connection.socket) {
                this.conn.connection.socket.setTimeout(0);
                this.conn.connection.socet.setKeepAlive(true, 10000);
            }

            this.getRoster();
        });

        conn.on('stanza', function (stanza) {
            if (stanza.is('presence')) {
                internalEvents.emit('onlineFriendsInternal', stanza);
                let friendName = allFriends[stanza.attrs.from.split('/')[0]];
                let toSplit = stanza.attrs.from.split('/');
                let friend = toSplit[0];
                if (stanza.attrs.type && stanza.attrs.type === 'unavailable') {
                    delete onlineFriends[friendname];
                }
                else if (stanza.children.length > 0) {
                    // todo
                    let friendstuff = {
                        status: stanza.children[0].children[0],
                        body: stanza.children[1].children[0]
                    };

                    let name = allFriends[friend];
                    let body = friendstuff.body;
                    let info;
                    parseString(body, (err, result) => {
                        info = (result && result.body) ? result.body : body;
                    });
                    let addInfo = {
                        status: friendstuff.status,
                        body: friendstuff.body,
                        jid: friend
                    }

                    let extended = extend(info);
                    onlineFriends[name] = extend(info, addInfo);
                    if (name) {
                        this.events.emit('onlineFriendsUpdate', name);
                    }
                }
            }

            else if(stanza.is('iq')) {
                internalEvents.emit('allFriends', stanza);
                for (let f in stanza.children[0].children) {
                    allFriends[stanza.children[0].children[f].attrs.jid] = stanza.children[0].children[f].attrs.name;
                }
            }

            else if(stanza.is('message')) {
                if(stanza.attrs.type == 'chat') {
                    let body = stanza.getChild('body');
                    if (body) {
                        let message = body.getText();
                        let from = stanza.attrs.from;
                        let id = from.split('/')[0];
                        internalEvents.emit('receiveMessage', id, message);
                    }
                }
            }
        });
    }

    getRoster() {
        // todo
        let roster = new xmpp.Element('iq', {id: 'roster_0', type: 'get'});
        roster.c('query', {xlmns: 'jabber:iq:roster'});
        conn.send(roster);
    }

    getAllFriends() {
        return allFriends;
    }

    sendMessage(to, message) {
        let to_name = new RegExp(name, 'i');

        let jid = (function () {
            let key;
            for (key in onlineFriends) {
                if (key.match(to_name)) {
                    return onlineFriends[key].jid;
                }
            }
            return undefined;
        })();
        if (!jid) {
            return;
        }
        jid += '/xiff';
        let stanza = new xmpp.Element('message', {to: jid, type: 'chat'});
        stanza.c('body').t(message);
        this.conn.send(stanza);
    }
}
