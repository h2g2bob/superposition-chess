/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React from 'react';
import ChessPiece from './ChessPiece';
import './Square.css';

function Square({
  team, pieces, background, highlight, onClick, sizeVMin,
}) {
  return (
    <div
      className={`square square-${background} highlight-${highlight}`}
      onClick={onClick}
      role="button"
    >
      <ChessPiece
        team={team}
        pieces={pieces}
        size={`${sizeVMin}vmin`}
      />
    </div>
  );
}

Square.propTypes = {
  team: PropTypes.string,
  pieces: PropTypes.arrayOf(PropTypes.string).isRequired,
  background: PropTypes.string.isRequired,
  highlight: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  sizeVMin: PropTypes.number.isRequired,
};

Square.defaultProps = {
  team: null,
};

export default Square;
