import React from 'react';
import ReactDOM from 'react-dom';
import { Bishop } from './ImageMixer';
import './index.css';


class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props["value"]  };
  }
  render() {
    return (
      <span className="square">
        <span>{ this.state.value }</span>
        <Bishop/>
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
        grid[i][j] = "hello";
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
                  <Square value={ square } />
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

