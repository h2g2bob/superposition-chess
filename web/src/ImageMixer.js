import React from 'react';

import img_bd from './images/Chess_bdt45.svg'
import img_bl from './images/Chess_blt45.svg'
import img_kd from './images/Chess_kdt45.svg'
import img_kl from './images/Chess_klt45.svg'
import img_nd from './images/Chess_ndt45.svg'
import img_nl from './images/Chess_nlt45.svg'
import img_pd from './images/Chess_pdt45.svg'
import img_pl from './images/Chess_plt45.svg'
import img_qd from './images/Chess_qdt45.svg'
import img_ql from './images/Chess_qlt45.svg'
import img_rd from './images/Chess_rdt45.svg'
import img_rl from './images/Chess_rlt45.svg'

import './ImageMixer.css'

export {
  Bishop
}

const IMAGES = {
  "d": {
    "b": img_bd,
    "k": img_kd,
    "n": img_nd,
    "p": img_pd,
    "q": img_qd,
    "r": img_rd
  },
  "l": {
    "b": img_bl,
    "k": img_kl,
    "n": img_nl,
    "p": img_pl,
    "q": img_ql,
    "r": img_rl
  }
}

class Bishop extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="stack">
        {
          this.props.pieces.map((piece, index) => (
            <img
              style={{ opacity: 1.0/(index+1) }}
              src={ IMAGES[this.props.team][piece] }
            />
          ))
        }
      </div>
    )
  }
}
