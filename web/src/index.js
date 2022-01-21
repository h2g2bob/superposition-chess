import React from 'react';
import ReactDOM from 'react-dom';
import { Bishop } from './ImageMixer';
import './index.css';


class Square extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span className={ "square square-" + this.props.background }>
        <Bishop
          team={ this.props.team }
          pieces={ this.props.pieces }
        />
      </span>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    const size = 4;
    var grid = [];
    for (var i=0; i < size; i++) {
      grid[i] = [];
      for (var j=0; j < size; j++) {
        grid[i][j] = {
            "team": i == 0 ? "d" : i == size - 1 ? "l" : null,
            "pieces": (i == 0 || i == size - 1) ? ["b", "k"]: [],
            "background": (i+j)%2 ? "d" : "l"
        };
      }
    }

    this.state = {
      grid: grid,
    }
  }

  render() {
    return (
      <div>
        hello world
        {
          this.state.grid.map((row) => (
            <div className="row">
              {
                row.map((square) => (
                  <Square
                    team={ square.team }
                    pieces={ square.pieces }
                    background={ square.background }
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
  document.getElementById('root')
);

