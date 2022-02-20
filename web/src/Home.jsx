import React from 'react';
import uuid from 'react-uuid';
import { useDispatch } from 'react-redux';
import { useRouter } from 'react-router5';
import { newGameAction } from './actions';
import C from './constants';
import './Home.css';

function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const availableChoices = [C.ROOK, C.KING, C.PAWN, C.PAWN];
  return (
    <button
      className="start_game"
      type="button"
      onClick={() => {
        const newGameId = uuid();
        router.navigate('game', { id: newGameId });
        dispatch(newGameAction(newGameId, availableChoices));
      }}
    >
      New game
    </button>
  );
}

Home.propTypes = {
};

export default Home;
