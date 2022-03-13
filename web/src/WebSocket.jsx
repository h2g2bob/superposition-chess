import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
// import { useDispatch } from 'react-redux';

const WS_BASE = '/socket.io/';

const WebSocketContext = createContext(null);

/* eslint-disable no-console */
function WebSocket({ children }) {
  let socket;
  let ws;

  // const dispatch = useDispatch();

  /* nothing is conected up yet, so we can only send messages into the void
   * where they might get logged, possibly
   */
  const sendIntoVoid = (msg) => {
    const payload = {
      msg,
    };
    socket.emit('event://send-into-void', JSON.stringify(payload));
  };

  if (!socket) {
    socket = io.connect(WS_BASE);
    socket.on('event://get-message', (msg) => {
      console.log(msg);
    });

    ws = {
      socket,
      sendIntoVoid,
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
}

WebSocket.propTypes = {
  children: PropTypes.element.isRequired,
};

export { WebSocketContext };
export default WebSocket;
