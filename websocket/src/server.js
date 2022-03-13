import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  path: '/socket.io/', // this is the default anyway
  cors: {
    origin: 'http://localhost:3000',
  }
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

  socket.on('send-into-void', (msg) => {
    console.log(`send into void: ${msg}`);
  });
});

httpServer.listen(3001);
