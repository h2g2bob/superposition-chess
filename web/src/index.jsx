/* eslint-disable max-classes-per-file */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import React from 'react';
import ReactDOM from 'react-dom';
import { Bishop } from './ImageMixer';
import './index.css';

class Square extends React.Component {
  render() {
    const { team, pieces, background } = this.props;
    return (
      <span className={`square square-${background}`}>
        <Bishop
          team={team}
          pieces={pieces}
        />
      </span>
    );
  }
}

function makeArray(start, lessThan) {
  const a = [];
  for (let i = start; i < lessThan; ++i) {
    a.push(i);
  }
  return a;
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

    this.state = {
      pieces,
      size,
    };
  }

  pieceAt(i, j) {
    const { pieces } = this.state;
    const [maybePiece] = pieces.filter((piece) => piece.row === i && piece.col === j);
    return maybePiece;
  }

  square(i, j) {
    const piece = this.pieceAt(i, j);
    return (
      <Square
        key={j}
        team={piece ? piece.team : null}
        pieces={piece ? piece.choices : []}
        background={(i + j) % 2 ? 'd' : 'l'}
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

ReactDOM.render(
  <Board />,
  document.getElementById('root'),
);
