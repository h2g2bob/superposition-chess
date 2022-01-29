import PropTypes from 'prop-types';
import React from 'react';

import './ImageMixer.css';

function ImageMixer({ images }) {
  return (
    <div className="stack">
      {
        images.map((image, index) => (
          <img
            key={image}
            style={{ opacity: 1.0 / (index + 1) }}
            src={image}
            alt=""
          />
        ))
      }
    </div>
  );
}

ImageMixer.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageMixer;
