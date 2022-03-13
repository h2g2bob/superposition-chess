import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import WebSocketProvider, { WebSocketContext } from './WebSocket';
import { newGameAfterDelayAction } from './actions';
import C from './constants';

function WSMsgBtn() {
  const ws = useContext(WebSocketContext);
  return (
    <div>
      <button
        type="button"
        onClick={() => ws.sendIntoVoid('hello world')}
      >
        Msg
      </button>
    </div>
  );
}

function Test() {
  const dispatch = useDispatch();
  return (
    <WebSocketProvider>
      <button
        type="button"
        onClick={() => dispatch(newGameAfterDelayAction('1234', [C.KING, C.PAWN]))}
      >
        Test
      </button>
      <WSMsgBtn />
    </WebSocketProvider>
  );
}

Test.defaultProps = {};

export default Test;
