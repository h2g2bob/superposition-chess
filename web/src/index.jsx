/* eslint-disable max-classes-per-file */
/* eslint-disable react/prefer-stateless-function */
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

    this.state = {
      size,
    };
  }

  square(i, j) {
    const { size } = this.state;
    return (
      <Square
        key={j}
        team={i === 0 ? 'd' : i === size - 1 ? 'l' : null}
        pieces={(i === 0 || i === size - 1) ? ['b', 'k'] : []}
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
