import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { createRouteNodeSelector } from 'redux-router5';
import Home from './Home';
import Game from './Game';
import Test from './Test';
import { commitMoveAction, rollbackMoveAction } from './actions';

import './App.css';

/* eslint-disable react/prop-types */
/* eslint-disable no-console */
function App({ route }) {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  useSelector((state) => console.log(state));
  if (game && game.id) {
    const pieces = game.proposedPieces !== null ? game.proposedPieces : game.pieces;
    return (
      <div className="game_holder">
        <Game
          boardSize={game.boardSize}
          pieces={pieces}
          playerTeam={game.playerTeam}
          selectedPieceKey={game.selectedPieceKey}
        />
        <button
          className="banner_button commit_button"
          type="button"
          style={{ display: game.proposedPieces ? '' : 'none' }}
          onClick={() => dispatch(commitMoveAction())}
        >
          Move
        </button>
        <button
          className="banner_button rollback_button"
          type="button"
          style={{ display: game.proposedPieces ? '' : 'none' }}
          onClick={() => dispatch(rollbackMoveAction())}
        >
          Cancel
        </button>
      </div>
    );
  }

  const { name } = route;
  if (name === 'test') {
    return (
      <Test />
    );
  }

  return <Home />;
}

App.propTypes = {
};

export default connect(createRouteNodeSelector(''))(App);
