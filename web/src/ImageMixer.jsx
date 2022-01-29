/* eslint-disable react/prefer-stateless-function */

import PropTypes from 'prop-types';
import React from 'react';

import './ImageMixer.css';

class ImageMixer extends React.Component {
  render() {
    const { images } = this.props;
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
}

ImageMixer.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageMixer;
