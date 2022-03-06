import React from 'react';
import PropTypes from 'prop-types';
import ChessPiece from './ChessPiece';

function PiecesList({ pieces, sizeVMin }) {
  return (
    <div className="pieces_list">
      {
        pieces.map((piece) => {
          const { team, choices, key } = piece;
          return (
            <ChessPiece
              team={team}
              pieces={choices}
              size={`${sizeVMin}vmin`}
              key={key}
            />
          );
        })
      }
    </div>
  );
}

PiecesList.propTypes = {
  pieces: PropTypes.arrayOf(PropTypes.object).isRequired,
  sizeVMin: PropTypes.number.isRequired,
};

export default PiecesList;
