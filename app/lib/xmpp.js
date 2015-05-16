'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _nodeXmppClient = require('node-xmpp-client');

var _nodeXmppClient2 = _interopRequireDefault(_nodeXmppClient);

var _events = require('events');

var _xtend = require('xtend');

var _xtend2 = _interopRequireDefault(_xtend);

var _xml2js = require('xml2js');

var allFriends = {};
var onlineFriends = {};

// Settings
var conn = undefined;
var internalEvents = new _events.EventEmitter();

// LoL XMPP events
var PASSWORD_PREFIX = 'AIR_';
var RESOURCE = 'xiff';
var DOMAIN = 'pvp.net';
var PORT = 5223;
var LEGACY_SSL = true;

var leagueXMPP = (function () {
    function leagueXMPP() {
        _classCallCheck(this, leagueXMPP);
    }

    _createClass(leagueXMPP, [{
        key: 'getRoster',
        value: function getRoster() {
            // todo
            var roster = new _nodeXmppClient2['default'].Element('iq', { id: 'roster_0', type: 'get' });
            roster.c('query', { xlmns: 'jabber:iq:roster' });
            conn.send(roster);
        }
    }, {
        key: 'getAllFriends',
        value: function getAllFriends() {
            return allFriends;
        }
    }, {
        key: 'sendMessage',
        value: function sendMessage(to, message) {
            var to_name = new RegExp(name, 'i');

            var jid = (function () {
                var key = undefined;
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
            var stanza = new _nodeXmppClient2['default'].Element('message', { to: jid, type: 'chat' });
            stanza.c('body').t(message);
            this.conn.send(stanza);
        }
    }], [{
        key: 'connectTest',
        value: function connectTest(username, password, server) {

            var conn2 = new _nodeXmppClient2['default'].Client({
                jid: '' + username + '@' + DOMAIN + '/' + RESOURCE,
                password: PASSWORD_PREFIX + password,
                host: 'chat.euw1.lol.riotgames.com',
                port: PORT,
                legacySSL: LEGACY_SSL
            });

            console.log('new client made');

            conn2.on('online', function (data) {
                console.log(data);

                if (conn2.connection.socket) {
                    conn2.connection.socket.setTimeout(0);
                    conn2.connection.socet.setKeepAlive(true, 10000);
                }
            });
        }
    }, {
        key: 'connect',
        value: function connect(username, password, server) {
            var _this = this;

            this.conn = conn;
            this.username = username;

            conn.on('close', function () {
                internalEvents.emit('close');
            });

            conn.on('error', function (err) {
                internalEvents.emit('error', err);
            });

            conn.on('online', function (data) {
                console.log(_nodeXmppClient2['default'].Element);
                console.log(data);
                conn.send(new _nodeXmppClient2['default'].Element('presence'));
                internalEvents.emit('online', data);

                if (_this.conn.connection.socket) {
                    _this.conn.connection.socket.setTimeout(0);
                    _this.conn.connection.socet.setKeepAlive(true, 10000);
                }

                _this.getRoster();
            });

            conn.on('stanza', function (stanza) {
                var _this2 = this;

                if (stanza.is('presence')) {
                    internalEvents.emit('onlineFriendsInternal', stanza);
                    var friendName = allFriends[stanza.attrs.from.split('/')[0]];
                    var toSplit = stanza.attrs.from.split('/');
                    var friend = toSplit[0];
                    if (stanza.attrs.type && stanza.attrs.type === 'unavailable') {
                        delete onlineFriends[friendname];
                    } else if (stanza.children.length > 0) {
                        (function () {
                            // todo
                            var friendstuff = {
                                status: stanza.children[0].children[0],
                                body: stanza.children[1].children[0]
                            };

                            var name = allFriends[friend];
                            var body = friendstuff.body;
                            var info = undefined;
                            _xml2js.parseString(body, function (err, result) {
                                info = result && result.body ? result.body : body;
                            });
                            var addInfo = {
                                status: friendstuff.status,
                                body: friendstuff.body,
                                jid: friend
                            };

                            var extended = _xtend2['default'](info);
                            onlineFriends[name] = _xtend2['default'](info, addInfo);
                            if (name) {
                                _this2.events.emit('onlineFriendsUpdate', name);
                            }
                        })();
                    }
                } else if (stanza.is('iq')) {
                    internalEvents.emit('allFriends', stanza);
                    for (var f in stanza.children[0].children) {
                        allFriends[stanza.children[0].children[f].attrs.jid] = stanza.children[0].children[f].attrs.name;
                    }
                } else if (stanza.is('message')) {
                    if (stanza.attrs.type == 'chat') {
                        var body = stanza.getChild('body');
                        if (body) {
                            var message = body.getText();
                            var from = stanza.attrs.from;
                            var id = from.split('/')[0];
                            internalEvents.emit('receiveMessage', id, message);
                        }
                    }
                }
            });
        }
    }]);

    return leagueXMPP;
})();

exports['default'] = leagueXMPP;
module.exports = exports['default'];