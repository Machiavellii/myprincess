import React, { useState } from 'react';

import FsLightbox from 'fslightbox-react';

const Carousel = ({ photos }) => {
  let [leftArrow] = useState('');
  let [rightArrow] = useState('');
  const [togg, setToggler] = useState(false);
  const [photoGallery, setPhotos] = useState('');

  rightArrow = () => {
    document.getElementById('move').scrollLeft += 250;
  };

  leftArrow = () => {
    document.getElementById('move').scrollLeft -= 150;
  };

  const toggler = photo => {
    setPhotos(photo);
    setToggler(!togg);
  };

  return (
    <div className="carousel-holder">
      <div className="carousel-gallery" id="move">
        {photos.map((photo, i) => (
          <img
            key={i}
            src={`${window.location.origin}/${photo}`}
            alt=""
            className="img-fluid"
            onClick={e => toggler(photo)}
          />
        ))}
      </div>
      <div className="leftArrow arrow" onClick={leftArrow}>
        <i className="fas fa-arrow-left"></i>
      </div>
      <div className="rightArrow arrow" onClick={rightArrow}>
        <i className="fas fa-arrow-right"></i>
      </div>
      {/* <FsLightbox
        toggler={toggler}
        sources={[`${window.location.origin}/${photoGallery}`]}
      /> */}
    </div>
  );
};

export default Carousel;
