import React from 'react';
import uuid from 'react-uuid';
// import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { newGameAction } from './actions';

/* eslint-disable react/prop-types */
function Home() {
  const dispatch = useDispatch();
  return (
    <button
      type="button"
      onClick={() => {
        const newGameId = uuid();
        /* this dispatch doesn't happen if we also pushRoute!? */
        dispatch(newGameAction(newGameId, 4));
        // pushRoute(`/game/${newGameId}`);
      }}
    >
      New game
    </button>
  );
}

Home.propTypes = {
};

export default Home;
