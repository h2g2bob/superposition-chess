import React from 'react';
import PropTypes from 'prop-types';
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    const { pieces } = props; // hack

    const selectedPieceKey = null;
    const playerTeam = C.LIGHT;

    this.state = {
      pieces,
      selectedPieceKey,
      playerTeam,
    };
  }

  selectSquare(i, j) {
    const { boardSize } = this.props;

    this.setState((state) => {
      const {
        selectedPieceKey, pieces, playerTeam,
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
      const remainingPieceChoices = canMove(selectedPiece, pieces, i, j, boardSize);
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
    const { boardSize } = this.props;
    const {
      pieces, selectedPieceKey, playerTeam,
    } = this.state;

    const [selectedPiece] = pieces.filter((piece) => piece.key === selectedPieceKey);

    return (
      <div>
        hello world
        <Board
          size={boardSize}
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

Game.propTypes = {
  boardSize: PropTypes.number.isRequired,
  pieces: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Game;
