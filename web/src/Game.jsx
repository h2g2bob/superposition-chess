import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Board from './Board';
import { pieceAt } from './moves';
import { selectPieceAction, moveOrTakeAction } from './actions';
import C from './constants';

/* eslint-disable no-console */
function Game({
  pieces,
  playerTeam,
  selectedPieceKey,
  boardSize,
}) {
  const [selectedPiece] = pieces.filter((piece) => piece.key === selectedPieceKey);
  const dispatch = useDispatch();

  return (
    <div className="game">
      <Board
        size={boardSize}
        pieces={pieces}
        selectedPiece={selectedPiece}
        selectSquare={(i, j) => {
          const pieceAtIJ = pieceAt(pieces, i, j);
          if (!selectedPiece) {
            if (pieceAtIJ && pieceAtIJ.team === playerTeam) {
              dispatch(selectPieceAction(pieceAtIJ.key));
            }
          } else if (pieceAtIJ && pieceAtIJ.key === selectedPiece.key) {
            // click same piece again to un-select
            dispatch(selectPieceAction(null));
          } else {
            dispatch(moveOrTakeAction(selectedPiece.key, i, j));
          }
        }}
      />
      <div>
        {
          playerTeam === C.LIGHT ? 'WHITE to play' : 'BLACK to play'
        }
      </div>
    </div>
  );
}

Game.propTypes = {
  boardSize: PropTypes.number.isRequired,
  pieces: PropTypes.arrayOf(PropTypes.object).isRequired,
  playerTeam: PropTypes.string.isRequired,
  selectedPieceKey: PropTypes.string,
};

Game.defaultProps = {
  selectedPieceKey: null,
};

export default Game;
