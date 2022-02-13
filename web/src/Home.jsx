import React from 'react';
import uuid from 'react-uuid';
import { useDispatch } from 'react-redux';
import { newGameAction } from './actions';

function Home() {
  const dispatch = useDispatch();
  return (
    <button
      type="button"
      onClick={() => {
        const newGameId = uuid();
        dispatch(newGameAction(newGameId, 4));
      }}
    >
      New game
    </button>
  );
}

Home.propTypes = {
};

export default Home;
