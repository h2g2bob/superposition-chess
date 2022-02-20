import React from 'react';
import NewGameButton from './NewGameButton';
import C from './constants';

function Home() {
  return (
    <div>
      <NewGameButton
        label="New game"
        availableChoices={[C.KING, C.ROOK, C.PAWN, C.PAWN]}
      />
      <NewGameButton
        label="KRRP"
        availableChoices={[C.KING, C.ROOK, C.ROOK, C.PAWN]}
      />
      <NewGameButton
        label="KRBP"
        availableChoices={[C.KING, C.ROOK, C.BISHOP, C.PAWN]}
      />
      <NewGameButton
        label="KQRB"
        availableChoices={[C.KING, C.QUEEN, C.ROOK, C.BISHOP]}
      />
    </div>
  );
}

Home.propTypes = {
};

export default Home;
