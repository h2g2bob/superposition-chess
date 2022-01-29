/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import Square from './Square';
import { pieceAt } from './moves';
import './index.css';

function makeArray(start, lessThan) {
  const a = [];
  for (let i = start; i < lessThan; i += 1) {
    a.push(i);
  }
  return a;
}

class Board extends React.Component {
  square(i, j) {
    const { pieces } = this.props;
    const piece = pieceAt(pieces, i, j);
    const { selectedPiece, selectSquare } = this.props;
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

  render() {
    const { size } = this.props;

    const rowHeaders = makeArray(0, size);
    const colHeaders = makeArray(0, size);

    return (
      <div className="board">
        {
          rowHeaders.map((i) => (
            <div className="row" key={i}>
              {
                colHeaders.map((j) => this.square(i, j))
              }
            </div>
          ))
        }
      </div>
    );
  }
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
