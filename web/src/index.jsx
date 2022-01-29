/* eslint-disable no-plusplus */
import React from 'react';
import ReactDOM from 'react-dom';
import Square from './Square';
import { pieceAt, canMove } from './moves';
import C from './constants';
import './index.css';

function makeArray(start, lessThan) {
  const a = [];
  for (let i = start; i < lessThan; ++i) {
    a.push(i);
  }
  return a;
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

function otherTeam(team) {
  return team === C.LIGHT ? C.DARK : C.LIGHT;
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
        choices: [C.ROOK, C.KING, C.PAWN],
        team: C.DARK,
        key: `d${idx}`,
      });
      pieces.push({
        row: size - 1,
        col: idx,
        choices: [C.ROOK, C.KING, C.PAWN],
        team: C.LIGHT,
        key: `l${idx}`,
      });
    });

    const selectedPiece = null;
    const playerTeam = C.LIGHT;

    this.state = {
      pieces,
      size,
      selectedPiece,
      playerTeam,
    };
  }

  selectSquare(i, j) {
    this.setState((state) => {
      const {
        selectedPiece, pieces, size, playerTeam,
      } = state;

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

      /* move/take allowed */
      const remainingPieceChoices = canMove(selectedPiece, pieces, i, j, size);
      if (!remainingPieceChoices.length) {
        return {};
      }

      const willTakePiece = pieceAt(pieces, i, j);
      if (willTakePiece) {
        /* take */
        return {};
      }

      /* move */
      return {
        selectedPiece: null,
        pieces: updatePiece(pieces, selectedPiece.key, {
          row: i,
          col: j,
          choices: remainingPieceChoices,
        }),
        playerTeam: otherTeam(playerTeam),
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
