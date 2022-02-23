import React from 'react';
import NewGameButton from './NewGameButton';
import C from './constants';
import './Home.css';

function Home() {
  return (
    <div className="new_game_options_list">
      <div style={{ 'text-align': 'center' }}>New game</div>
      <NewGameButton
        label="KRPP"
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
      <NewGameButton
        label="KRNN"
        availableChoices={[C.KING, C.ROOK, C.KNIGHT, C.KNIGHT]}
      />
      <NewGameButton
        label="KAQR"
        availableChoices={[C.KING, C.AMAZON, C.QUEEN, C.ROOK]}
      />
      <NewGameButton
        label="KKPP"
        availableChoices={[C.KING, C.EXTRAKING, C.PAWN, C.PAWN]}
      />
      <NewGameButton
        label="KKKK"
        availableChoices={[C.KING, C.EXTRAKING, C.EXTRAKING, C.EXTRAKING]}
      />
      <NewGameButton
        label="KK"
        availableChoices={[C.KING, C.EXTRAKING]}
      />
      <NewGameButton
        label="KRB"
        availableChoices={[C.KING, C.ROOK, C.BISHOP]}
      />
      <NewGameButton
        label="KQRBNP"
        availableChoices={[C.KING, C.QUEEN, C.ROOK, C.BISHOP, C.KNIGHT, C.PAWN]}
      />
      <NewGameButton
        label="KRBPP"
        availableChoices={[C.KING, C.ROOK, C.BISHOP, C.PAWN, C.PAWN]}
      />
      <NewGameButton
        label="KQRBPP"
        availableChoices={[C.KING, C.QUEEN, C.ROOK, C.BISHOP, C.PAWN, C.PAWN]}
      />
      <NewGameButton
        label="KRRBBPP"
        availableChoices={[C.KING, C.ROOK, C.ROOK, C.BISHOP, C.BISHOP, C.PAWN, C.PAWN]}
      />
      <NewGameButton
        label="KQRRBBPP"
        availableChoices={[C.KING, C.QUEEN, C.ROOK, C.ROOK, C.BISHOP, C.BISHOP, C.PAWN, C.PAWN]}
      />
      <NewGameButton
        label="KAAAAAA"
        availableChoices={[C.KING, C.AMAZON, C.AMAZON, C.AMAZON, C.AMAZON, C.AMAZON, C.AMAZON]}
      />
    </div>
  );
}

Home.propTypes = {
};

export default Home;
