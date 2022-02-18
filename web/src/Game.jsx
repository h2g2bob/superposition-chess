import React from 'react';
import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';
import Board from './Board';
import { pieceAt, canMove } from './moves';
// import { setPlayerTeamAction } from './actions';
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
    const { pieces, playerTeam } = props; // hack

    const selectedPieceKey = null;

    this.state = {
      pieces,
      playerTeam,
      selectedPieceKey,
    };
  }

  selectSquare(i, j) {
    const { boardSize, playerTeam } = this.props;

    this.setState((state) => {
      const {
        selectedPieceKey, pieces,
      } = state;

      const [selectedPiece] = pieces.filter((piece) => piece.key === selectedPieceKey);
      if (!selectedPiece) {
        const newSelectedPiece = pieceAt(pieces, i, j);
        if (newSelectedPiece && newSelectedPiece.team === playerTeam) {
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
      /*
        If we were a pure component, we could...
          const dispatch = useDispatch();
          dispatch(setPlayerTeamAction(otherTeam(playerTeam)));
      */
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
  playerTeam: PropTypes.string.isRequired,
};

export default Game;
