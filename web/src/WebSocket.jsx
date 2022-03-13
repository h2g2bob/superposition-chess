import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

const WS_BASE = '/socket.io/';

const WebSocketContext = createContext(null);

class WebSocket extends React.Component {
  componentDidMount() {
    const socket = io.connect(WS_BASE);
    socket.on('event://get-message', (msg) => {
      /* eslint-disable no-console */
      console.log(msg);
    });
    const ws = {
      sendIntoVoid: this.sendIntoVoid,
    };
    this.setState({ socket, ws });
  }

  componentWillUnmount() {
    const { socket } = this.state;
    socket.disconnect();
  }

  sendIntoVoid(msg) {
    /* nothing is conected up yet, so we can only send messages into the void
     * where they might get logged, possibly
     */
    const { socket } = this.state;
    const payload = {
      msg,
    };
    socket.emit('event://send-into-void', JSON.stringify(payload));
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

WebSocket.propTypes = {
  children: PropTypes.element.isRequired,
};

export { WebSocketContext };
export default WebSocket;
