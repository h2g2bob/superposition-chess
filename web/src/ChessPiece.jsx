import PropTypes from 'prop-types';
import React from 'react';
import ImageMixer from './ImageMixer';
import C from './constants';

import imgbd from './images/Chess_bdt45.svg';
import imgbl from './images/Chess_blt45.svg';
import imgkd from './images/Chess_kdt45.svg';
import imgkl from './images/Chess_klt45.svg';
import imgnd from './images/Chess_ndt45.svg';
import imgnl from './images/Chess_nlt45.svg';
import imgpd from './images/Chess_pdt45.svg';
import imgpl from './images/Chess_plt45.svg';
import imgqd from './images/Chess_qdt45.svg';
import imgql from './images/Chess_qlt45.svg';
import imgrd from './images/Chess_rdt45.svg';
import imgrl from './images/Chess_rlt45.svg';
import imgad from './images/Chess_Adt26.svg';
import imgal from './images/Chess_Alt26.svg';

const IMAGES = {};
IMAGES[C.DARK] = {};
IMAGES[C.DARK][C.BISHOP] = imgbd;
IMAGES[C.DARK][C.KING] = imgkd;
IMAGES[C.DARK][C.KNIGHT] = imgnd;
IMAGES[C.DARK][C.PAWN] = imgpd;
IMAGES[C.DARK][C.QUEEN] = imgqd;
IMAGES[C.DARK][C.ROOK] = imgrd;
IMAGES[C.DARK][C.AMAZON] = imgad;
IMAGES[C.LIGHT] = {};
IMAGES[C.LIGHT][C.BISHOP] = imgbl;
IMAGES[C.LIGHT][C.KING] = imgkl;
IMAGES[C.LIGHT][C.KNIGHT] = imgnl;
IMAGES[C.LIGHT][C.PAWN] = imgpl;
IMAGES[C.LIGHT][C.QUEEN] = imgql;
IMAGES[C.LIGHT][C.ROOK] = imgrl;
IMAGES[C.LIGHT][C.AMAZON] = imgal;

function ChessPiece({ pieces, team }) {
  return (
    <ImageMixer images={
      pieces.map((piece) => IMAGES[team][piece])
    }
    />
  );
}

ChessPiece.propTypes = {
  team: PropTypes.string,
  pieces: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ChessPiece.defaultProps = {
  team: null,
};

export default ChessPiece;
