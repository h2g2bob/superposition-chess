/* eslint-disable no-plusplus */
import React from 'react';
import ReactDOM from 'react-dom';
import Square from './Square';
import './index.css';

function makeArray(start, lessThan) {
  const a = [];
  for (let i = start; i < lessThan; ++i) {
    a.push(i);
  }
  return a;
}

function pieceAt(pieces, i, j) {
  const maybePieceList = pieces.filter((piece) => piece.row === i && piece.col === j);
  if (i === null) {
    return null;
  }
  if (maybePieceList.length === 1) {
    return maybePieceList[0];
  }
  if (maybePieceList.length === 0) {
    return null;
  }
  throw new Error('multiple pieces at the same place');
}

function updatePiece(pieces, key, update) {
  return pieces.map((oldPiece) => {
    if (oldPiece.key === key) {
      const newPiece = { ...oldPiece, ...update };
      return newPiece;
    }
    return oldPiece;
  });
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    const size = 4;
    const pieces = [];

    makeArray(0, size).forEach((idx) => {
      pieces.push({
        row: 0,
        col: idx,
        choices: ['r', 'k', 'p'],
        team: 'd',
        key: `d${idx}`,
      });
      pieces.push({
        row: size - 1,
        col: idx,
        choices: ['r', 'k', 'p'],
        team: 'l',
        key: `l${idx}`,
      });
    });

    const selectedPiece = null;
    const playerTeam = 'l';

    this.state = {
      pieces,
      size,
      selectedPiece,
      playerTeam,
    };
  }

  selectSquare(i, j) {
    this.setState((state) => {
      const { selectedPiece, pieces } = state;

      if (!selectedPiece) {
        const newSelectedPiece = pieceAt(pieces, i, j);
        if (newSelectedPiece && newSelectedPiece.team === state.playerTeam) {
          /* select */
          return { selectedPiece: newSelectedPiece };
        }
        return {};
      }

      if (selectedPiece.row === i && selectedPiece.col === j) {
        /* unselect */
        return { selectedPiece: null };
      }

      const willTakePiece = pieceAt(pieces, i, j);
      if (willTakePiece) {
        /* take */
        return {};
      }

      /* move */
      return {
        selectedPiece: null,
        pieces: updatePiece(pieces, selectedPiece.key, { row: i, col: j }),
      };
    });
  }

  pieceAt(i, j) {
    const { pieces } = this.state;
    return pieceAt(pieces, i, j);
  }

  square(i, j) {
    const piece = this.pieceAt(i, j);
    const { selectedPiece } = this.state;
    return (
      <Square
        key={j}
        team={piece ? piece.team : null}
        pieces={piece ? piece.choices : []}
        background={(i + j) % 2 ? 'd' : 'l'}
        isSelected={selectedPiece !== null && selectedPiece.row === i && selectedPiece.col === j}
        onClick={() => this.selectSquare(i, j)}
      />
    );
  }

  render() {
    const { size } = this.state;

    const rowHeaders = makeArray(0, size);
    const colHeaders = makeArray(0, size);

    return (
      <div>
        hello world
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
};

ReactDOM.render(
  <Board />,
  document.getElementById('root'),
);
