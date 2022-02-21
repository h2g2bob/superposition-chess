/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import Square from './Square';
import { pieceAt } from './moves';
import './Board.css';

function makeArray(start, lessThan) {
  const a = [];
  for (let i = start; i < lessThan; i += 1) {
    a.push(i);
  }
  return a;
}

function Board({
  pieces, selectedPiece, selectSquare, size,
}) {
  function square(i, j) {
    const piece = pieceAt(pieces, i, j);
    let highlight = 'normal';
    if (selectedPiece !== null && selectedPiece.row === i && selectedPiece.col === j) {
      highlight = 'selected';
    }
    return (
      <Square
        key={j}
        team={piece ? piece.team : null}
        pieces={piece ? piece.choices : []}
        background={(i + j) % 2 ? 'd' : 'l'}
        highlight={highlight}
        sizeVMin={90 / size}
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
  size: PropTypes.number.isRequired,
};

Board.defaultProps = {
  selectedPiece: null,
};

export default Board;
