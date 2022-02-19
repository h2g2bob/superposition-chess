import React from 'react';
import { connect, useSelector } from 'react-redux';
import { createRouteNodeSelector } from 'redux-router5';

import Home from './Home';
import Game from './Game';

/* eslint-disable react/prop-types */
/* eslint-disable no-console */
function App() {
  const game = useSelector((state) => state.game);
  useSelector((state) => console.log(state));
  if (game && game.id) {
    return (
      <Game
        boardSize={game.boardSize}
        pieces={game.pieces}
        playerTeam={game.playerTeam}
        selectedPieceKey={game.selectedPieceKey}
      />
    );
  }
  return <Home />;
}

App.propTypes = {
};

export default connect(createRouteNodeSelector(''))(App);
