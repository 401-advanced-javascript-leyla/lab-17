'use strict';

const SocketIoClient = require('socket.io-client');
const API_URL = 'http://localhost:3000';
const server = SocketIoClient.connect(API_URL);

server.on('file-save', file=>log('file-save', file));
server.on('file-error', error=>logErr('file-error', error));



/**
 *This will let us know that we saved the file
 *
 * @param {object} event
 * @param {object} file
 */
function log(event,file){
  console.log(`${file} saved`);
}

/**
 *This will let us know that there is an error
 *
 * @param {object} event
 * @param {object} file
 */
function logErr(event,error){
  console.log(`There is an error, ${error}`);
}
