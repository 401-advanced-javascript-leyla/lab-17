'use strict';

//event listener setup
// const events = require('./events.js');

const SocketIoClient = require('socket.io-client');
const API_URL = 'http://localhost:3000';
const server = SocketIoClient.connect(API_URL);

const fs = require('fs');
const util = require('util');

/**
* This function will read the file and convert the content to uppercase
* @param {object} file
*/
const readFile = util.promisify(fs.readFile);

/**
 * This function will read the file and convert the content to uppercase
 * @param {object} file
 * @returns {object} data
 */
const writeFile = util.promisify(fs.writeFile);



/**
 * This function will convert the content to uppercase (stringfy it first, then upper case it and re-buffer-ize it)
 * @param {object} data
 * @returns {object} text
 */
const toUpperCase = (data)=>{
  let text = data.toString().toUpperCase();
  return Buffer.from(text);
};




/**
 * This function will read the File and then convert the content to uppercase, then save the file
 * @param {object} file
 */

const alterFile = (file) => {
  let text = null;

  readFile(file)
    .then(data =>{
      text = toUpperCase(data);
      return writeFile(file, text)
        .then(()=>{
          server.emit('file-save', file);
        });
    })
    .catch(err=>{
      server.emit('file-error', err);
    });

};

//When testing at terminal, need to write 'node src/app.js files/test.txt'
let file = process.argv.slice(2).shift();
alterFile(file);
