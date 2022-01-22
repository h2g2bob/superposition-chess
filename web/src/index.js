/* eslint-disable max-classes-per-file */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
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

class Board extends React.Component {
  constructor(props) {
    super(props);

    const size = 4;
    const grid = [];
    for (let i = 0; i < size; i++) {
      grid[i] = [];
      for (let j = 0; j < size; j++) {
        grid[i][j] = {
          team: i === 0 ? 'd' : i === size - 1 ? 'l' : null,
          pieces: (i === 0 || i === size - 1) ? ['b', 'k'] : [],
          background: (i + j) % 2 ? 'd' : 'l',
        };
      }
    }

    this.state = {
      grid,
    };
  }

  render() {
    const { grid } = this.state;
    return (
      <div>
        hello world
        {
          grid.map((row) => (
            <div className="row">
              {
                row.map((square) => (
                  <Square
                    team={square.team}
                    pieces={square.pieces}
                    background={square.background}
                  />
                ))
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
