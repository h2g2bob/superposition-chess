import img_bd from './images/Chess_bdt45.svg'
import img_bl from './images/Chess_blt45.svg'
import img_kd from './images/Chess_kdt45.svg'
import img_kt from './images/Chess_klt45.svg'
import img_nd from './images/Chess_ndt45.svg'
import img_nl from './images/Chess_nlt45.svg'
import img_pd from './images/Chess_pdt45.svg'
import img_pt from './images/Chess_plt45.svg'
import img_qd from './images/Chess_qdt45.svg'
import img_ql from './images/Chess_qlt45.svg'
import img_rd from './images/Chess_rdt45.svg'
import img_rl from './images/Chess_rlt45.svg'

import './ImageMixer.css'

export {
  Bishop
}

function Bishop() {
  var images = [ img_bd, img_kd ];
  return (
    <div className="stack">
      {
        images.map((image, index) => (
          <img style={{ opacity: 1.0/(index+1) }} src={image} alt="Dark Bishop" />
        ))
      }
    </div>
  )
}
