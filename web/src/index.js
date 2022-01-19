import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
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
            <div class="row">
              {
                row.map((square) => (
                  <em>{ square }</em>
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

