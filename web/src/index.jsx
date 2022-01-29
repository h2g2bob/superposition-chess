import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import { pieceAt, canMove } from './moves';
import C from './constants';
import './index.css';

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

class App extends React.Component {
  constructor(props) {
    super(props);

    const size = 4;
    const pieces = [];

    for (let idx = 0; idx < size; idx += 1) {
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
    }

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

  render() {
    const {
      size, pieces, selectedPiece, playerTeam,
    } = this.state;

    return (
      <div>
        hello world
        <Board
          pieces={pieces}
          selectedPiece={selectedPiece}
          selectSquare={(i, j) => this.selectSquare(i, j)}
          size={size}
        />
        <div>
          {
            playerTeam === C.LIGHT ? 'WHITE to play' : 'BLACK to play'
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
};

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
