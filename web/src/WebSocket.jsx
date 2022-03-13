/* eslint-disable no-console */

import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

const WS_BASE = 'ws://localhost:3001/';
const WS_OPT = {
  path: '/socket.io/',
};

const WebSocketContext = createContext(null);

class WebSocket extends React.Component {
  constructor(props) {
    super(props);

    const ws = {
      sendIntoVoid: (msg) => this.sendIntoVoid(msg),
    };
    this.state = {
      ws,
    };
  }

  componentDidMount() {
    const socket = io.connect(WS_BASE, WS_OPT);
    console.log('io.connect');
    socket.on('event://get-message', (msg) => {
      console.log(msg);
    });
    this.setState({ socket });
  }

  componentWillUnmount() {
    const { socket } = this.state;
    socket.disconnect();
  }

  sendIntoVoid(msg) {
    /* nothing is conected up yet, so we can only send messages into the void
     * where they might get logged, possibly
     */
    console.log(`Send into void: ${msg}`);
    const { socket } = this.state;
    const payload = {
      msg,
    };
    socket.emit('send-into-void', JSON.stringify(payload));
  }

  render() {
    const { children } = this.props;
    const { ws } = this.state;
    return (
      <WebSocketContext.Provider value={ws}>
        {children}
      </WebSocketContext.Provider>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
WebSocket.propTypes = {
  children: PropTypes.any.isRequired,
};

export { WebSocketContext };
export default WebSocket;
