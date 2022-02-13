import React from 'react';
import uuid from 'react-uuid';
import { useDispatch } from 'react-redux';
import { useRouter } from 'react-router5';
import { newGameAction } from './actions';

function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        const newGameId = uuid();
        router.navigate('game', { id: newGameId });
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
