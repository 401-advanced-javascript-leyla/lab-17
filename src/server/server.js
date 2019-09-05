'use strict';

const socketIoServer = require('socket.io')(3000);

socketIoServer.on('connection', socket=>{
  console.log('Connected', socket.id);

  socket.on('file-save', file=>{
    console.log('saving the file');
    socket.broadcast.emit('file-save', file);
  });

  socket.on('file-error', error=>{
    console.log('There is an error');
    socket.broadcast.emit('file-error', error);
  });
});

console.log('server is connected at port 3000');