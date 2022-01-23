/* eslint-disable max-classes-per-file */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import ImageMixer from './ImageMixer';
import './index.css';

class Square extends React.Component {
  render() {
    const {
      team, pieces, background, isSelected, onClick,
    } = this.props;
    return (
      <span
        className={`square square-${background} square-selected-${isSelected}`}
        onClick={onClick}
        role="button"
      >
        <ImageMixer
          team={team}
          pieces={pieces}
        />
      </span>
    );
  }
}

Square.propTypes = {
  team: PropTypes.string,
  pieces: PropTypes.arrayOf(PropTypes.string).isRequired,
  background: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

Square.defaultProps = {
  team: null,
};

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
      });
      pieces.push({
        row: size - 1,
        col: idx,
        choices: ['r', 'k', 'p'],
        team: 'l',
      });
    });

    const selectedSquare = [null, null];
    const playerTeam = 'l';

    this.state = {
      pieces,
      size,
      selectedSquare,
      playerTeam,
    };
  }

  selectSquare(i, j) {
    this.setState((state) => {
      const [selectedSquareRow, selectedSquareCol] = state.selectedSquare;
      const selectedSameSquare = selectedSquareRow === i && selectedSquareCol === j;
      const currentlySelectedPiece = pieceAt(state.pieces, selectedSquareRow, selectedSquareCol);
      const newlySelectedPiece = pieceAt(state.pieces, i, j);
      if (selectedSameSquare) {
        return { selectedSquare: [null, null] };
      }
      if (currentlySelectedPiece) {
        /* suggest move */
        return {};
      }
      if (newlySelectedPiece && newlySelectedPiece.team === state.playerTeam) {
        return { selectedSquare: [i, j] };
      }
      return {};
    });
  }

  pieceAt(i, j) {
    const { pieces } = this.state;
    return pieceAt(pieces, i, j);
  }

  square(i, j) {
    const piece = this.pieceAt(i, j);
    const { selectedSquare } = this.state;
    const [selectedSquareRow, selectedSquareCol] = selectedSquare;
    return (
      <Square
        key={j}
        team={piece ? piece.team : null}
        pieces={piece ? piece.choices : []}
        background={(i + j) % 2 ? 'd' : 'l'}
        isSelected={selectedSquareRow === i && selectedSquareCol === j}
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
