import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  path: '/socket.io/', // this is the default anyway
});

/* eslint-disable no-console */
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chessstate', (msg) => {
    // broadcast
    io.emit('chessstate', msg);
  });
});

httpServer.listen(3001);
