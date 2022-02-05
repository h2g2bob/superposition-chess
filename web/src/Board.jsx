/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import Square from './Square';
import { pieceAt } from './moves';

function makeArray(start, lessThan) {
  const a = [];
  for (let i = start; i < lessThan; i += 1) {
    a.push(i);
  }
  return a;
}

function Board({
  pieces, selectedPiece, selectSquare,
}) {
  const size = useSelector((state) => state.game.boardSize);

  function square(i, j) {
    const piece = pieceAt(pieces, i, j);
    return (
      <Square
        key={j}
        team={piece ? piece.team : null}
        pieces={piece ? piece.choices : []}
        background={(i + j) % 2 ? 'd' : 'l'}
        isSelected={selectedPiece !== null && selectedPiece.row === i && selectedPiece.col === j}
        onClick={() => selectSquare(i, j)}
      />
    );
  }

  const rowHeaders = makeArray(0, size);
  const colHeaders = makeArray(0, size);

  return (
    <div className="board">
      {
        rowHeaders.map((i) => (
          <div className="row" key={i}>
            {
              colHeaders.map((j) => square(i, j))
            }
          </div>
        ))
      }
    </div>
  );
}

Board.propTypes = {
  pieces: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedPiece: PropTypes.object,
  selectSquare: PropTypes.func.isRequired,
};

Board.defaultProps = {
  selectedPiece: null,
};

export default Board;
