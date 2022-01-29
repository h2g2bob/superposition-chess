/* eslint-disable react/prefer-stateless-function */

import PropTypes from 'prop-types';
import React from 'react';
import ImageMixer from './ImageMixer';

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

const IMAGES = {
  d: {
    b: imgbd,
    k: imgkd,
    n: imgnd,
    p: imgpd,
    q: imgqd,
    r: imgrd,
  },
  l: {
    b: imgbl,
    k: imgkl,
    n: imgnl,
    p: imgpl,
    q: imgql,
    r: imgrl,
  },
};

class ChessPiece extends React.Component {
  render() {
    const { pieces, team } = this.props;
    return (
      <ImageMixer images={
        pieces.map((piece) => IMAGES[team][piece])
      }
      />
    );
  }
}

ChessPiece.propTypes = {
  team: PropTypes.string,
  pieces: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ChessPiece.defaultProps = {
  team: null,
};

export default ChessPiece;
