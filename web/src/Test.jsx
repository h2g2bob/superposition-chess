import React from 'react';
import { useDispatch } from 'react-redux';
import { newGameAfterDelayAction } from './actions';
import C from './constants';

function Test() {
  const dispatch = useDispatch();
  return (
    <button
      type="button"
      onClick={() => dispatch(newGameAfterDelayAction('1234', [C.KING, C.PAWN]))}
    >
      Test
    </button>
  );
}

Test.defaultProps = {};

export default Test;
