import React from 'react';
import Board from './Board';
import { pieceAt, canMove } from './moves';
import C from './constants';

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

    // size -- This should be fixed when we move pieces into the store, or
    // make START_GAME into an action
    const size = 4; // nasty shadow of a value in the store

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

    const selectedPieceKey = null;
    const playerTeam = C.LIGHT;

    this.state = {
      pieces,
      selectedPieceKey,
      playerTeam,
    };
  }

  selectSquare(i, j) {
    this.setState((state) => {
      const {
        selectedPieceKey, pieces, size, playerTeam,
      } = state;

      const [selectedPiece] = pieces.filter((piece) => piece.key === selectedPieceKey);
      if (!selectedPiece) {
        const newSelectedPiece = pieceAt(pieces, i, j);
        if (newSelectedPiece && newSelectedPiece.team === state.playerTeam) {
          /* select */
          return { selectedPieceKey: newSelectedPiece.key };
        }
        return {};
      }

      if (selectedPiece.row === i && selectedPiece.col === j) {
        /* unselect */
        return { selectedPieceKey: null };
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
        selectedPieceKey: null,
        pieces: updatePiece(pieces, selectedPieceKey, {
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
      pieces, selectedPieceKey, playerTeam,
    } = this.state;

    const [selectedPiece] = pieces.filter((piece) => piece.key === selectedPieceKey);

    return (
      <div>
        hello world
        <Board
          pieces={pieces}
          selectedPiece={selectedPiece}
          selectSquare={(i, j) => this.selectSquare(i, j)}
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

export default App;
