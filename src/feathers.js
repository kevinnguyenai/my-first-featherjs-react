const io = require('socket.io-client');
const feathers = require('@feathersjs/client');
const socketio = require('@feathersjs/socketio-client');
const auth = require('@feathersjs/authentication-client');
// const RxJS = require('rxjs');
// const reactive = require('feathers-reactive');
// const rest = require('@feathersjs/rest-client');
// const fetch = require('isomorphic-fetch');

// Setup Socket Client
const socket = io('https://www.myfirstfeatherjsapp.tk:30000')
const client = feathers();

// Setup configuration options
// .configure(rest(server).fetch(fetch))
client.configure(socketio(socket))
// client.configure(reactive(RxJS, { idField: '_id' }))
// client.configure(auth({ storage: window.localStorage }))

export default client;