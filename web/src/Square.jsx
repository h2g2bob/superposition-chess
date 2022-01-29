/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React from 'react';
import ChessPiece from './ChessPiece';
import './Square.css';

function Square({
  team, pieces, background, isSelected, onClick,
}) {
  return (
    <span
      className={`square square-${background} square-selected-${isSelected}`}
      onClick={onClick}
      role="button"
    >
      <ChessPiece
        team={team}
        pieces={pieces}
      />
    </span>
  );
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

export default Square;
